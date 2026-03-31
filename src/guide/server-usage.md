# Server Deployment Guide

EasyConnect SSH, code name `ssh-vpn`, takes pride in requiring **minimal to no complicated infrastructure configurations**, a striking contrast to heavyweight protocols like OpenVPN or WireGuard.

Because EasyConnect SSH inherently leverages the mature SSH protocol, we offer two out-of-the-box deployment solutions depending on your infrastructure.

---

## Method A: The Built-in `ssh-vpn-server` (For Lightweight/Embedded Devices)

This is the official standalone server daemon natively bundled with the project.

### 🌟 Key Advantages:
- **Ultra-Lightweight & Optimized**: Engineered to consume microscopic amounts of memory, this daemon thrives on standard Linux VPSs but also runs flawlessly on deeply constrained embedded devices—even **OpenWrt routers with 64-128MB RAM**.
- **Hardened Security Pipeline**: Unlike standard SSH packages, `ssh-vpn-server` intentionally *exclusively* implements the `tcpchannel` protocol and strictly disables any interactive shell access. Even if an attacker uncovers its identity, they cannot acquire OS terminal commands, nullifying the risk of server takeover completely.

### Quick Start Deployment

1. **Prepare Host Keys**: Identity is paramount for encrypted handshakes. Generate fresh RSA keys for your VPN host:
   ```bash
   ssh-keygen -t rsa -f /etc/ssh-vpn/host_rsa_key
   ```
2. **Launch the Daemon**: Download the exact binary for your architecture from GitHub and mount it onto an open port:
   ```bash
   ssh-vpn-server -hostkey /etc/ssh-vpn/host_rsa_key -port 2222
   ```
3. **Manage VPN Users**: Add new authenticated users securely via the CLI without flat-file chaos:
   ```bash
   ssh-vpn-server user -add "my_user" -password "secure_pass_123"
   ```

### Registering as a System Service (Optional)

Instead of manually keeping the server alive, `ssh-vpn-server` can officially register itself as a reliable background service running at startup.

```bash
# Optional: Set up memory constraints and SSH connection resilience limits
export GOMEMLIMIT=30MiB
export SSHVPN_SSHD_MAX_DIRECT_GLOBAL=512

# Trigger the install. It automatically bundles the above variables into Systemd!
ssh-vpn-server service install
ssh-vpn-server service start
```

---

## Method B: Native OpenSSH (Recommended for Heavy Production Workloads)

Because ssh-vpn fundamentally drives standardized SSH, **you don't actually need to install our proprietary tracking daemon!** If you already hold a robustly configured Linux instance with standard `OpenSSH`, that alone fulfills the role of the master VPN tunnel node.

### ⚡ Automated Setup Script (The Easy Way)
For convenience, we provide an automated configuration script for Debian, Ubuntu, and CentOS. You can directly copy the code below and run it on your server:

<details>
<summary><b>Click to expand and view the script source (setup_vpn_server.sh)</b></summary>

```bash
#!/bin/bash
# ssh-vpn server setup script
# SSH config check, apply config, add VPN user, add authorized keys
# Run as root or with sudo on the server

set -e

SSHD_CONFIG="${SSHD_CONFIG:-/etc/ssh/sshd_config}"
VPN_USER="${VPN_USER:-vpnuser}"
FORCE_CMD="${FORCE_CMD:-/usr/sbin/nologin}"

# Detect SSH service name (ssh on Ubuntu/Debian, sshd on CentOS/RHEL)
detect_ssh_service() {
    if systemctl list-units --type=service 2>/dev/null | grep -q 'sshd\.service'; then
        echo "sshd"
    elif systemctl list-units --type=service 2>/dev/null | grep -q 'ssh\.service'; then
        echo "ssh"
    else
        echo "sshd"  # default
    fi
}

SSH_SERVICE=$(detect_ssh_service)

red() { echo -e "\033[31m$*\033[0m"; }
green() { echo -e "\033[32m$*\033[0m"; }
yellow() { echo -e "\033[33m$*\033[0m"; }
info() { echo -e "\033[36m[INFO]\033[0m $*"; }

check_root() {
    if [[ $EUID -ne 0 ]]; then
        red "Run as root or with sudo"
        exit 1
    fi
}

# Run sshd syntax check; print errors (do not hide stderr).
sshd_config_test() {
    local err
    if ! err=$(sshd -t -f "$SSHD_CONFIG" 2>&1); then
        red "sshd -t failed:"
        echo "$err"
        return 1
    fi
    return 0
}

# Update sshd_config for VPN (globals + Match User). No service restart.
# Used by cmd_config and cmd_add_user so add-user alone keeps sshd in sync.
ensure_sshd_vpn_config() {
    if [[ ! -f "$SSHD_CONFIG" ]]; then
        red "Config file not found: $SSHD_CONFIG"
        exit 1
    fi

    # Backup
    cp -a "$SSHD_CONFIG" "${SSHD_CONFIG}.bak.$(date +%Y%m%d%H%M%S)"
    info "Backed up to ${SSHD_CONFIG}.bak.*"

    # Ensure global AllowTcpForwarding
    if ! grep -qE '^\s*AllowTcpForwarding\s+yes' "$SSHD_CONFIG"; then
        if grep -qE '^\s*AllowTcpForwarding' "$SSHD_CONFIG"; then
            sed -i.bak 's/^\s*AllowTcpForwarding.*/AllowTcpForwarding yes/' "$SSHD_CONFIG"
        else
            echo "AllowTcpForwarding yes" >> "$SSHD_CONFIG"
        fi
        info "Set AllowTcpForwarding yes"
    fi

    # Ensure PubkeyAuthentication
    if ! grep -qE '^\s*PubkeyAuthentication\s+yes' "$SSHD_CONFIG"; then
        if grep -qE '^\s*PubkeyAuthentication' "$SSHD_CONFIG"; then
            sed -i 's/^\s*PubkeyAuthentication.*/PubkeyAuthentication yes/' "$SSHD_CONFIG"
        else
            echo "PubkeyAuthentication yes" >> "$SSHD_CONFIG"
        fi
        info "Set PubkeyAuthentication yes"
    fi

    # Optional: performance options (MUST stay in global section; directives after
    # a Match line belong to that Match until the next Match — TCPKeepAlive etc.
    # are invalid inside Match and make "sshd -t" fail.)
    for opt in "TCPKeepAlive yes" "ClientAliveInterval 60" "ClientAliveCountMax 3"; do
        local key=$(echo "$opt" | cut -d' ' -f1)
        if ! grep -qE "^\s*$key\s+" "$SSHD_CONFIG"; then
            if grep -qE '^Match[[:space:]]' "$SSHD_CONFIG"; then
                local tmp
                tmp=$(mktemp)
                local inserted=0
                while IFS= read -r line || [[ -n "$line" ]]; do
                    if [[ $inserted -eq 0 ]] && [[ "$line" =~ ^Match[[:space:]] ]]; then
                        echo "$opt"
                        inserted=1
                    fi
                    echo "$line"
                done < "$SSHD_CONFIG" > "$tmp"
                mv "$tmp" "$SSHD_CONFIG"
            else
                echo "$opt" >> "$SSHD_CONFIG"
            fi
            info "Added $opt (global section, before any Match block)"
        fi
    done

    # Add Match User block last so nothing global is parsed under Match
    if ! grep -q "Match User $VPN_USER" "$SSHD_CONFIG"; then
        # Check if nologin exists
        if [[ -x "$FORCE_CMD" ]]; then
            cat >> "$SSHD_CONFIG" << EOF

# ssh-vpn: forwarding only, no shell login
Match User $VPN_USER
    AllowTcpForwarding yes
    ForceCommand $FORCE_CMD
EOF
            info "Added Match User $VPN_USER config"
        else
            yellow "$FORCE_CMD not found, using /bin/false"
            FORCE_CMD="/bin/false"
            cat >> "$SSHD_CONFIG" << EOF

# ssh-vpn: forwarding only, no shell login
Match User $VPN_USER
    AllowTcpForwarding yes
    ForceCommand $FORCE_CMD
EOF
            info "Added Match User $VPN_USER config (using /bin/false)"
        fi
    else
        info "Match User $VPN_USER already exists, skip"
    fi
}

# 1. Config check
cmd_check() {
    info "Checking SSH server config: $SSHD_CONFIG"
    echo ""

    if [[ ! -f "$SSHD_CONFIG" ]]; then
        red "Config file not found: $SSHD_CONFIG"
        exit 1
    fi

    local ok=0
    local warn=0

    # AllowTcpForwarding
    if grep -qE '^\s*AllowTcpForwarding\s+yes' "$SSHD_CONFIG" || grep -qE '^\s*#\s*AllowTcpForwarding' "$SSHD_CONFIG"; then
        local val=$(grep -E '^\s*AllowTcpForwarding' "$SSHD_CONFIG" 2>/dev/null | tail -1 | awk '{print $2}')
        if [[ "$val" == "yes" ]]; then
            green "✓ AllowTcpForwarding = yes (TCP forwarding enabled)"
            ((ok++))
        else
            yellow "✗ AllowTcpForwarding = $val (should be yes for VPN)"
            ((warn++))
        fi
    else
        yellow "✗ AllowTcpForwarding not set (default may be yes)"
        ((warn++))
    fi

    # PubkeyAuthentication
    if grep -qE '^\s*PubkeyAuthentication' "$SSHD_CONFIG"; then
        local val=$(grep -E '^\s*PubkeyAuthentication' "$SSHD_CONFIG" | tail -1 | awk '{print $2}')
        if [[ "$val" == "yes" ]]; then
            green "✓ PubkeyAuthentication = yes (pubkey auth enabled)"
            ((ok++))
        else
            yellow "✗ PubkeyAuthentication = $val (suggest yes)"
            ((warn++))
        fi
    else
        green "✓ PubkeyAuthentication not set (default yes)"
        ((ok++))
    fi

    # Match User config (for VPN user)
    if grep -q "Match User" "$SSHD_CONFIG" && grep -A5 "Match User" "$SSHD_CONFIG" | grep -q "ForceCommand"; then
        green "✓ Match User + ForceCommand configured (forwarding only, no shell)"
        ((ok++))
    else
        yellow "○ Match User restriction not configured (optional)"
    fi

    # Performance
    if grep -qE '^\s*ClientAliveInterval' "$SSHD_CONFIG"; then
        green "✓ ClientAliveInterval configured"
        ((ok++))
    else
        yellow "○ ClientAliveInterval not configured (optional, suggest 60)"
    fi

    echo ""
    info "Check done: $ok ok, $warn to fix"
}

# 2. Apply config
cmd_config() {
    check_root
    info "Configuring SSH server: $SSHD_CONFIG"

    ensure_sshd_vpn_config

    # Test config
    if sshd_config_test; then
        green "Config syntax OK"
        read -p "Restart SSH service? [y/N] " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            systemctl restart "$SSH_SERVICE"
            green "SSH service restarted"
        else
            yellow "Run manually: systemctl restart $SSH_SERVICE"
        fi
    else
        red "Config error, please check. Backup kept under ${SSHD_CONFIG}.bak.*"
        exit 1
    fi
}

# 3. Add VPN user
cmd_add_user() {
    check_root
    info "Adding VPN user: $VPN_USER"

    if id "$VPN_USER" &>/dev/null; then
        yellow "User $VPN_USER already exists"
    else
        useradd -m -s /usr/sbin/nologin "$VPN_USER"
        green "Created user $VPN_USER (Shell: nologin)"
    fi

    # Ensure .ssh directory
    local home=$(eval echo ~$VPN_USER)
    mkdir -p "$home/.ssh"
    chmod 700 "$home/.ssh"
    chown -R "$VPN_USER:$VPN_USER" "$home/.ssh"
    info "Created $home/.ssh directory"

    info "Syncing sshd_config for $VPN_USER (same as: $0 config)"
    ensure_sshd_vpn_config

    if sshd_config_test; then
        green "sshd config syntax OK"
        yellow "If sshd_config changed, apply with: systemctl restart $SSH_SERVICE"
    else
        red "sshd config error after update. Backup kept under ${SSHD_CONFIG}.bak.*"
        yellow "If lines like TCPKeepAlive appear after a Match block, move them above the first Match line or restore the latest .bak file."
        exit 1
    fi
}

# 4. Add public key
cmd_add_key() {
    check_root

    local pubkey="$1"
    if [[ -z "$pubkey" ]]; then
        red "Usage: $0 add-key <pubkey-content-or-file-path>"
        echo ""
        echo "Examples:"
        echo "  $0 add-key /path/to/id_ed25519.pub"
        echo "  $0 add-key 'ssh-ed25519 AAAAC3... user@host'"
        echo ""
        echo "Use VPN_USER=myuser to specify user, default: $VPN_USER"
        exit 1
    fi

    local key_content
    if [[ -f "$pubkey" ]]; then
        key_content=$(cat "$pubkey")
    else
        key_content="$pubkey"
    fi

    # Validate pubkey format
    if ! echo "$key_content" | grep -qE '^(ssh-ed25519|ssh-rsa|ecdsa-sha2) '; then
        red "Invalid pubkey format, should start with ssh-ed25519, ssh-rsa or ecdsa-sha2"
        exit 1
    fi

    local home=$(eval echo ~$VPN_USER)
    if [[ ! -d "$home" ]]; then
        red "User $VPN_USER not found, run: $0 add-user first"
        exit 1
    fi

    mkdir -p "$home/.ssh"
    chmod 700 "$home/.ssh"

    # Check if already exists
    if [[ -f "$home/.ssh/authorized_keys" ]] && grep -qF "$key_content" "$home/.ssh/authorized_keys"; then
        yellow "Pubkey already in $VPN_USER authorized_keys"
        exit 0
    fi

    echo "$key_content" >> "$home/.ssh/authorized_keys"
    chmod 600 "$home/.ssh/authorized_keys"
    chown -R "$VPN_USER:$VPN_USER" "$home/.ssh"
    green "Added pubkey to $VPN_USER authorized_keys"
}

# 5. Generate SSH key (run on client, not server)
cmd_gen_key() {
    local email="$1"
    local algo="${2:-ed25519}"

    if [[ -z "$email" ]]; then
        red "Usage: $0 gen-key <email> [algorithm]"
        echo ""
        echo "Generates SSH key pair for ssh-vpn. Run on your local machine."
        echo ""
        echo "Arguments:"
        echo "  email      Required. Used as comment in the public key."
        echo "  algorithm  Optional. ed25519 (default), rsa, or ecdsa"
        echo ""
        echo "Examples:"
        echo "  $0 gen-key user@example.com"
        echo "  $0 gen-key user@example.com rsa"
        echo "  $0 gen-key user@example.com ecdsa"
        echo ""
        echo "Output: ~/.ssh/<email-local>_<algo> (private) and .pub (public)"
        echo ""
        echo "If this machine has account VPN_USER (default vpnuser), the pubkey is added to its"
        echo "authorized_keys: as root directly, or as a normal user via sudo (password prompt)."
        exit 1
    fi

    local ssh_dir="${HOME}/.ssh"
    mkdir -p "$ssh_dir"

    # Filename from email local part (before @), safe for paths
    local key_basename="${email%%@*}"
    key_basename="${key_basename//[^a-zA-Z0-9._-]/_}"
    [[ -z "$key_basename" ]] && key_basename="vpn_key"
    [[ "$key_basename" == .* ]] && key_basename="vpn_${key_basename#.}"
    local key_file="${ssh_dir}/${key_basename}_${algo}"

    if [[ -f "$key_file" ]]; then
        yellow "Key file $key_file already exists"
        read -p "Overwrite? [y/N] " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 0
        fi
    fi

    case "$algo" in
        ed25519)
            ssh-keygen -t ed25519 -C "$email" -f "$key_file" -N ""
            ;;
        rsa)
            ssh-keygen -t rsa -b 4096 -C "$email" -f "$key_file" -N ""
            ;;
        ecdsa)
            ssh-keygen -t ecdsa -b 521 -C "$email" -f "$key_file" -N ""
            ;;
        *)
            red "Unsupported algorithm: $algo"
            echo "Supported: ed25519, rsa, ecdsa"
            exit 1
            ;;
    esac

    green "Generated key pair:"
    echo "  Private: $key_file"
    echo "  Public:  ${key_file}.pub"

    # If VPN_USER exists on this host, register pubkey (same logic as add-key)
    local setup_script="${BASH_SOURCE[0]}"
    [[ "$setup_script" != /* ]] && setup_script="$(pwd)/$setup_script"

    if id "$VPN_USER" &>/dev/null; then
        if [[ $EUID -eq 0 ]]; then
            cmd_add_key "${key_file}.pub"
        else
            info "Adding pubkey to $VPN_USER (sudo)..."
            if ! sudo env VPN_USER="$VPN_USER" bash "$setup_script" add-key "${key_file}.pub"; then
                yellow "Automatic add-key failed (sudo cancelled or denied)."
                info "Run: sudo VPN_USER=$VPN_USER bash $setup_script add-key ${key_file}.pub"
            fi
        fi
        echo ""
        info "Private key path (copy to client if generated on server): $key_file"
    else
        echo ""
        info "No local user \"$VPN_USER\" — copy the .pub to the VPN server, then run:"
        info "  sudo VPN_USER=$VPN_USER $0 add-key /path/to/$(basename "${key_file}.pub")"
    fi
}

# 6. Run all
cmd_all() {
    info "Running full setup..."
    cmd_add_user
    cmd_config
    echo ""
    yellow "Add pubkey with:"
    echo "  VPN_USER=$VPN_USER $0 add-key <pubkey-file-or-content>"
}

usage() {
    echo "ssh-vpn server setup script"
    echo ""
    echo "Usage: $0 <command> [args]"
    echo ""
    echo "Commands:"
    echo "  check           Check SSH config (no root)"
    echo "  config          Apply/update sshd config (root required)"
    echo "  add-user        Create VPN user + sync sshd_config (root required)"
    echo "  add-key KEY     Add pubkey to VPN user (root required)"
    echo "  gen-key EMAIL   Generate SSH key pair (run on client)"
    echo "  all             Run add-user + config (root required)"
    echo ""
    echo "Environment:"
    echo "  VPN_USER     VPN username (default: vpnuser)"
    echo "  SSHD_CONFIG  sshd config path (default: /etc/ssh/sshd_config)"
    echo "  FORCE_CMD    Force command for forwarding-only (default: /usr/sbin/nologin)"
    echo ""
    echo "Examples:"
    echo "  $0 check"
    echo "  sudo $0 config"
    echo "  sudo VPN_USER=myvpn $0 add-user"
    echo "  sudo $0 add-key ~/.ssh/user_ed25519.pub"
    echo "  $0 gen-key user@example.com"
    echo "  $0 gen-key user@example.com rsa"
    echo "  sudo $0 all"
}

case "${1:-}" in
    "")
        yellow "No command specified."
        echo ""
        usage
        exit 1
        ;;
    check)    cmd_check ;;
    config)   cmd_config ;;
    add-user) cmd_add_user ;;
    add-key)  cmd_add_key "$2" ;;
    gen-key)  cmd_gen_key "$2" "$3" ;;
    all)      cmd_all ;;
    -h|--help|help) usage ;;
    *)
        red "Unknown command: $1"
        echo ""
        usage
        exit 1
        ;;
esac
```

</details>

### Usage Steps

1. **Save and Run**:
   Copy the script content above into a file named `setup_vpn_server.sh` on your server and grant execution permissions:
   ```bash
   chmod +x setup_vpn_server.sh
   ```

2. **Automated Setup**:
   Run the following command to automatically enable TCP forwarding, create a restricted `vpnuser` with no shell access (`/usr/sbin/nologin`), and apply performance tuning:
   ```bash
   sudo ./setup_vpn_server.sh all
   ```

3. **Register SSH Public Key** (Recommended):
   If you use an SSH key for authentication, register your local machine as an authorized guest:
   ```bash
   sudo ./setup_vpn_server.sh add-key "ssh-ed25519 AAAAC3... my_computer"
   ```

### Securing OpenSSH Manually (The Hard Way)
If you prefer not to use the automated script, edit your `/etc/ssh/sshd_config` with the following parameters to ensure perfect compatibility and restrict unwarranted command-line access.

1. **Enable Strict TCP Forwarding (Mandatory):**
   This enables the creation of raw SOCKS5 proxies and TUN network bridges.
   ```ssh
   AllowTcpForwarding yes
   ```

2. **Revoke Shell Access (High Security Mode):**
   We strongly advocate dedicating a VPN-only user (e.g., `vpnuser`) and explicitly forbidding terminal command execution.
   ```ssh
   Match User vpnuser
       AllowTcpForwarding yes
       # Substitute interactive shells with nologin
       ForceCommand /usr/sbin/nologin
   ```

3. **Performance Tweaks:**
   Protect long-running tunnels from aggressive router firewalls by emitting regular heartbeats:
   ```ssh
   TCPKeepAlive yes
   ClientAliveInterval 60
   ClientAliveCountMax 3
   ```

4. **Apply and Restart:**
   ```bash
   sudo systemctl restart sshd
   ```

*Note: For maximum operational security, we encourage combining Method B with `ed25519` cryptographic key pairs instead of plain-text passwords.*
