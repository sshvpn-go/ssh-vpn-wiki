# Command-Line Interface (CLI) Reference

The `ssh-vpn-cli` executable serves as both the VPN client daemon and the built-in server daemon. It offers powerful subcommands for controlling connections without a graphical interface.

## Global Flags

These flags can be applied before any subcommand.

| Flag | Description | Default |
|---|---|---|
| `-config-dir` | Directory containing `profile.json` and keys. | `~/.ssh-vpn` |
| `-profile` | Name of the specific VPN profile to activate. | *(Active Profile)* |
| `-v` | Show version information and exit. | |

---

## 💻 Client Subcommand
Starts the VPN connection based on your profile, intercepting local traffic via SOCKS5 or a virtual TUN interface.

```bash
ssh-vpn-cli [global-flags] client [flags]
```

### Client Flags
These override exactly what's written inside your `profile.json` for one-off sessions:

| Flag | Description | Examples |
|---|---|---|
| `-mode` | Operating proxy mode. | `socks5` or `tun` |
| `-host` | Remote SSH server hostname or IP address. | `192.168.1.1` |
| `-port` | Remote SSH server TCP port. | `22` |
| `-socks5-port` | Local port to expose the SOCKS5 proxy on. | `1080` |

### Examples
```bash
# Basic run utilizing saved configuration in ~/.ssh-vpn/profile.json
ssh-vpn-cli client

# Connect to a different profile by name
ssh-vpn-cli -profile "WorkServer" client

# Execute a one-off connection overriding the host natively
ssh-vpn-cli client -host ssh.example.com -port 2222 -mode socks5
```

---

## 🖥️ Server Subcommand
Starts the embedded, lightweight SSH server optimized for VPN proxying (Path A in our Server Guide).

```bash
ssh-vpn-cli [global-flags] server [flags]
```

### Server Flags

| Flag | Description | Examples |
|---|---|---|
| `-listen` | Network interface to bind the server on. | `0.0.0.0` or `127.0.0.1` |
| `-port` | Port to expose the SSH server on. | `2222` |

---

## 👤 User Subcommand (Server Management)
Handles authentication credentials for the built-in `ssh-vpn-cli server`.

```bash
ssh-vpn-cli user <action> [username] [flags]
```

### Actions

#### 1. Add / Update (`user add`)
Add a new user credential or update an existing one.

| Flag | Description |
|---|---|
| `-pass` | Explicitly define the connection password for the user. |
| `-gen-key` | Automatically generate a highly secure `ed25519` key pair. |
| `-key-path` | Disk path to output the private key file. |

**Example:**
```bash
ssh-vpn-cli user add alice -pass "secure123"
ssh-vpn-cli user add bob -gen-key -key-path ./bob_id_ed25519
```

#### 2. Remove (`user del`)
Remove a user from the authorized list.
```bash
ssh-vpn-cli user del alice
```

#### 3. List (`user list`)
Show all authorized users and their active authentication types.
```bash
ssh-vpn-cli user list
```

---

## 📈 Status Subcommand
Inspects the current network performance and throughput of an actively running local `ssh-vpn-cli` daemon.

```bash
ssh-vpn-cli status
```

**Output Example:**
```text
State:                 Connected
Active connections:    5
Uptime:                12h 4m
Bytes received:        452 MB
Bytes sent:            32 MB
```

---

# Standalone `ssh-vpn-server` Reference

While `ssh-vpn-cli server` starts an embedded SSH server from inside the client, the `ssh-vpn-server` binary is a dedicated, hardened server executable designed for background system services and router deployments (e.g., OpenWrt).

## Command-Line Arguments

```bash
ssh-vpn-server [flags] [command]
```

| Flag | Description | Default |
|---|---|---|
| `-port` | SSH listening port (Overrides config file). | Value in Config |
| `-listen` | SSH interface binding. | `0.0.0.0` |
| `-user` | Pre-configure an SSH username. | |
| `-pass` | Pre-configure an SSH password. | |
| `-key` | Path to valid `authorized_keys`. | |
| `-config-dir` | Path containing server data and configuration. | `~/.ssh-vpn` |

## Subcommands

| Command | Description |
|---|---|
| `service install` | Registers the server as a native background system service (Systemd, OpenRC, etc.). **Automatically captures exported environment variables.** |
| `service start` | Starts the installed background service. |
| `service stop` | Stops the running background service. |
| `service restart` | Restarts the background service. |
| `service uninstall`| Removes the background service from the OS startup routine. |
| `user add <name>` | Adds or updates a VPN user credential. |
| `user del <name>` | Deletes a VPN user. |
| `user list` | Lists all authorized users. |
| `status` | Outputs live analytics on active SSH tunnels, global rejection counts, and memory configurations. |

---

## Environment Variable Tuning (Advanced)

For highly constrained environments like 64MB memory OpenWrt routers, the `ssh-vpn-server` respects Go runtime flags and internal SSH Direct-TCP threshold variables to aggressively manage memory overhead.

### Go Runtime Limits

| Variable | Recommended (128MB Router) | Description |
|---|---|---|
| `GOMEMLIMIT` | `15MiB` | Sets a soft memory roof. Garbage Collector aggressively reclaims memory before hitting this hard limit. |
| `GOGC` | `50` | Triggers GC every time the heap grows by 50% (Default standard is 100, lower saves memory at slight CPU cost). |
| `GOMAXPROCS` | `1` | Restricts the Go thread scheduler to a single CPU core. Perfect for embedded systems to minimize context-switching overhead. |

### SSH Connection Resilience

| Variable | Default | Description |
|---|---|---|
| `SSHVPN_SSHD_MAX_DIRECT_GLOBAL` | `2048` | Maximum absolutely total concurrent TCP tunnels allowed simultaneously. Dial it down to ~128 on memory starved devices. |
| `SSHVPN_SSHD_MAX_DIRECT_PER_CONN` | `64` | Maximum tunnels a single authenticated user/connection can spawn (Prevents single-user abuse). |
| `SSHVPN_SSHD_DIAL_TIMEOUT` | `10s` | How long the server waits to establish a downstream connection before giving up. |
| `SSHVPN_SSHD_DIAL_KEEPALIVE` | `30s` | OS-level TCP KeepAlive probe period for downstream target sockets. |
| `SSHVPN_SSHD_RELAY_IDLE_TIMEOUT` | `5m` | Trimming period. Shuts down silent forwarded tunnels that haven't sent data in this timeframe. |

*Note: When you run `ssh-vpn-server service install`, the CLI actively detects these exported environment variables in your current shell and permanently embeds them into your `systemd` or `openrc` daemon configuration.*
