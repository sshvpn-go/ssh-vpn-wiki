# Configuration Reference (`profile.json`)

Behind the intuitive Graphical Interface (GUI) lies a highly structured JSON configuration file. 
Whether you're automating deployments, auditing security parameters, or unlocking advanced routing features, understanding `~/.vpn-go/profile.json` is essential for power users.

## The Config Structure

Your settings are persisted securely here. Below is a comprehensive breakdown of an active `Profile` object configuration (supported since version `1.0`).

### 1. Basic Connection & Identity
The fundamental parameters to establish the encrypted SSH tunnel.

| JSON Key | Type | Description |
|---|---|---|
| `name` | String | A human-readable display name for the profile. |
| `host` | String | IP address or domain name of your remote SSH server. |
| `port` | Number | TCP port your SSH server is listening on (default usually `22`). |
| `username` | String | Account login name for the SSH session. |
| `auth_type` | String | Defines how to log in. Either `"password"` or `"key"`. |
| `password` | String | The actual password (omit if using `key`). |
| `key_path` | String | Absolute path to your `.pem` / `id_rsa` / `ed25519` private key. |

### 2. Networking & Operational Mode
Determines how the tunnel interfaces with your operating system.

| JSON Key | Type | Description |
|---|---|---|
| `mode` | String | `"socks5"` for userspace proxy, or `"tun"` for global VPN take-over. |
| `socks5_port`| Number | Only applies in `"socks5"` mode. The localhost port to intercept network calls (defaults to `1080`). |
| `tun_name` | String | Define a custom name for the virtual card (e.g. `vpngo0`). Keep empty to auto-assign (`utun*` on mac, `tun0` on Linux). |
| `tun_ipv4` | String | The virtual IP & Mask assigned by the TUN interface (e.g., `10.0.0.1/24`). |
| `tun_ipv6` | String | The virtual IPv6 assigning mask (e.g., `fd00::1/64`). |
| `enable_system_proxy` | Boolean | If `true` under `"socks5"`, automatically overrides OS network settings to pipe all unencrypted traffic. |

### 3. DNS Leaks & Security (TUN Mode)
Critical parameters for bypassing DPI and enforcing strict DNS leak protection.

| JSON Key | Type | Description |
|---|---|---|
| `enable_local_dns` | Boolean | Start a hardened local DNS forwarder hijacking `127.0.0.1:53` natively. |
| `dns_servers` | Array | Fallback secure DNS upstream servers (e.g., `["8.8.8.8", "1.1.1.1"]`). |
| `dns_workers` | Number | Concurrent threads to process DNS interceptions (default `0` = auto). |

### 4. Smart Routing Engine
Rules that intelligently split traffic between your direct ISP and your private SSH Node.

| JSON Key | Type | Description |
|---|---|---|
| `enable_rules` | Boolean | Master switch to enable rule-based routing capabilities. |
| `rules_path` | String | File path linking to a valid rules text map (e.g., `china_rules.txt`). |
| `bypass_local` | Boolean | Force-whitelist all LAN subnets (`192.168.0.0/16`, `10.0.0.0/8`, etc.), drastically saving proxy bandwidth. |

### 5. Advanced Resilience
These parameters control timeout tolerances for flaky mobile networks and stringent hotel firewalls.

| JSON Key | Type | Description |
|---|---|---|
| `auto_reconnect` | Boolean | Automatically resurrect dead dropped tunnels endlessly. |
| `connect_timeout`| String | How long to wait for the initial SSH TCP handshake (default `"10s"`). |
| `keep_alive_interval` | String | Heartbeat pings sent over the tunnel to prevent stateful firewall termination (default `"30s"`). |
