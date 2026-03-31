# 服务端部署与使用指南

易连助手（EasyConnect SSH，代码 `ssh-vpn`）的最大优势在于其**无感精简的部署逻辑**。相比起需要配置复杂证书的 OpenVPN 或 WireGuard，易连助手的服务端完全依赖于成熟安全的 SSH 协议底座。

我们为您提供两种开箱即用的服务端部署模式以满足不同场景：

---

## 模式 A：使用内置 `ssh-vpn-server`（专为轻量级/嵌入式设备打造）

这是官方提供的独立服务端二进制程序，零外部依赖，极速拉起。

### 🌟 模式亮点：
- **极致轻量**：优化内存占用，不仅支持标准 Linux VPS，更**能完美运行在 OpenWrt 路由器等资源受限设备（甚至 64MB 内存的设备）**上。
- **纯粹的高安全性**：`ssh-vpn-server` 仅实现了最基础的 `tcpchannel`（端口转发协议层）。它从根本上**不支持建立任何可交互的 Shell 终端会话 (No Shell Access)**。这意味着即使该端口被探测，攻击者也绝无可能借此获取主机的服务器控制权，最大程度隔绝了入侵风险。

### 部署步骤

1. **准备主机密钥**：作为安全标识，若无现成密钥，可运行此命令生成一份 RSA 密钥对：
   ```bash
   ssh-keygen -t rsa -f /etc/ssh-vpn/host_rsa_key
   ```
2. **启动守护进程**：下载对应架构（如 `aarch64` / `x86_64`）的二进制文件并挂载：
   ```bash
   ssh-vpn-server -hostkey /etc/ssh-vpn/host_rsa_key -port 2222
   ```
3. **添加授权用户**：通过内置的 CLI 用户管理器安全添加账号，无需手动编辑文本配置：
   ```bash
   ssh-vpn-server user -add "my_user" -password "secure_pass_123"
   # 查看当前注册的用户
   ssh-vpn-server user -list
   ```

### 注册为系统的后台守护进程 (进阶选项)

您可以随时选择让它作为系统的系统级服务运行，从而实现开机自启和故障恢复：

```bash
# （可选操作）导出调优环境变量，告知服务限制自身的内存与并发管道数
export GOMEMLIMIT=30MiB
export SSHVPN_SSHD_MAX_DIRECT_GLOBAL=512

# 敲下这条指令后，上述环境变量将被自动烙印进系统的启动配置（如 Systemd）里！
ssh-vpn-server service install
ssh-vpn-server service start
```

---

## 模式 B：使用系统原生的 OpenSSH (推荐生产环境重负载使用)

由于 ssh-vpn 底层完全遵循标准 SSH 规范，如果您已经拥有一台 Linux 云服务器，**甚至不需要运行额外的 `ssh-vpn-server` 进程！** 直接将系统自带的 `OpenSSH` 作为数据隧道服务端，性能最强也最通用。

### ⚡ 全自动检测与配置脚本 (最简体验)
对于绝大部分基于 Debian / Ubuntu / CentOS 的云服务器，我们提供了一个全自动配置脚本。您可以直接将下方代码复制并在服务器上运行：

<details>
<summary><b>点击展开查看配置脚本源码 (setup_vpn_server.sh)</b></summary>

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

### 使用步骤

1. **保存并运行脚本**：
   将上述代码内容保存到服务器上的 `setup_vpn_server.sh` 文件中并赋予执行权限：
   ```bash
   # 粘贴并保存代码后执行：
   chmod +x setup_vpn_server.sh
   ```

2. **自动巡检与下发配置**：
   该指令会自动在 `sshd_config` 里启用 TCP 通道，创建一个无强行接管权限（`/usr/sbin/nologin`）名为 `vpnuser` 的受限用户，并添加心跳保活参数：
   ```bash
   sudo ./setup_vpn_server.sh all
   ```

3. **登记合法的 SSH 公钥** (推荐用法)：
   如果您在本地客户端使用的是加密密钥而非密码登入，可以通过此命令将本地机器注册为合法访客：
   ```bash
   sudo ./setup_vpn_server.sh add-key "ssh-ed25519 AAAAC3... 我的电脑"
   ```

### 纯手工修改指南 (Geek)
如果您不习惯跑别人写的自动脚本，可以在 `/etc/ssh/sshd_config` 文件中纯手工修改或附加以下参数以获得相同的安全特性：

1. **开启 TCP 转发支持 (必须项) :**
   这是建立 SOCKS5 代理和 TUN 隧道协议的核心前提：
   ```ssh
   AllowTcpForwarding yes
   ```

2. **限制交互式 Shell 权限 (首要安全措施) :**
   强烈建议为专用账号（如下方的 `vpnuser`）关闭终端登录权限，仅保留必要的转发能力：
   ```ssh
   Match User vpnuser
       AllowTcpForwarding yes
       # 强行替换用户请求的 Shell，拒绝 SSH 登录服务器执行指令
       ForceCommand /usr/sbin/nologin
   ```

3. **连接保活调优 (推荐) :**
   对于长时间保持连接的 SSH 隧道，可配置保活参数以减少因中间网络设备空闲超时导致的断连：
   ```ssh
   TCPKeepAlive yes
   ClientAliveInterval 60
   ClientAliveCountMax 3
   ```

4. **重启系统 SSH 进程使其生效:**
   ```bash
   sudo systemctl restart sshd
   ```
