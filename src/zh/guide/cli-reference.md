# CLI 命令行参考指南

`ssh-vpn-cli` 不仅仅是一个连接工具，它同时还是服务端和极客首选的诊断工具。这里详细列出了如何通过命令行完全驾驭您的代理服务。

## 全局参数 (Global Flags)

这些标志应位于任何子命令之前。

| 选项参数 | 说明 | 默认值 |
|---|---|---|
| `-config-dir` | 指定带有 `profile.json` 及其对应密钥的环境配置目录 | `~/.ssh-vpn` |
| `-profile` | 指定激活哪个已保存的节点配置 | *（当前选中的 Profile）* |
| `-v` | 显示软件版本号并退出 | |

---

## 💻 本地客户端 (`client`)
根据配置发起与远程代理服务器的连接，自动处理网络接口及 SOCKS5 开放。

```bash
ssh-vpn-cli [全局参数] client [参数]
```

### 客户端独占参数
这几项参数可以**覆盖（Override）**写死在 `profile.json` 中的现有值，多用于临时连接：

| 参数 | 说明 | 示例 |
|---|---|---|
| `-mode` | 指定要启动的工作模式 | `socks5` 或 `tun` |
| `-host` | 目标服务端节点的 IP 或域名地址 | `192.168.1.1` |
| `-port` | 目标服务端的 SSH 端口号 | `22` |
| `-socks5-port` | SOCKS5 在本机上暴露开放的端口号 | `1080` |

### 示例用法
```bash
# 自动读取硬盘 ~/.ssh-vpn/profile.json 发起连接
ssh-vpn-cli client

# 载入另一个预设配置环境来连接
ssh-vpn-cli -profile "公司内网" client

# 一次性临时连接新服务器，强行覆盖地址与端口
ssh-vpn-cli client -host 192.168.1.100 -port 2222 -mode socks5
```

---

## 🖥️ 内置服务器 (`server`)
拉起专门优化的内嵌 OpenSSH 服务进程（适用于服务端轻量部署模式 A）。

```bash
ssh-vpn-cli [全局参数] server [参数]
```

### 服务端独占参数

| 参数 | 说明 | 示例 |
|---|---|---|
| `-listen` | 覆盖监听的网络网卡及网段 | `0.0.0.0`（开放） 或 `127.0.0.1`（仅限本机） |
| `-port` | 监听的 SSH 入口服务端口 | `2222` |

---

## 👤 用户管理 (`user`)
专用于管理官方内置服务端（`server` 进程）的授权凭证。注意，不支持修改系统自带 OpenSSH 的账户。

```bash
ssh-vpn-cli user <行为> [用户名] [参数]
```

### 行为列表

#### 1. 添加与更新 (`user add`)
赋予某个用户新密码或是直接为其分发基于安全加密算法 `ed25519` 的数字私钥。

| 提供的重要参数 | 说明 |
|---|---|
| `-pass` | 指定建立连接所需的明文密码。 |
| `-gen-key` | 当缺少公钥时，为使用者自动生成一对高安全性安全公私钥。 |
| `-key-path` | 密钥保存的直接地址（默认为当前文件夹的 `.key`）。 |

**示例:**
```bash
ssh-vpn-cli user add charlie -pass "secure123"
ssh-vpn-cli user add bob -gen-key -key-path ./bob_id_ed25519
```

#### 2. 删除 (`user del`)
撤销指定用户的登录权限。
```bash
ssh-vpn-cli user del charlie
```

#### 3. 列表 (`user list`)
列出当前服务器批准的所有用户权限。
```bash
ssh-vpn-cli user list
```

---

## 📈 运行状态监测 (`status`)
在后台服务（如 TUN 与 Client）静默运行时，检查底层的连接稳定性与网络吞吐指标。

```bash
ssh-vpn-cli status
```

**模拟展示输出:**
```text
State:                 Connected
Active connections:    12
Uptime:                4d 2h 10m
Bytes received:        10.2 GB
Bytes sent:            210 MB
```

---

# 独立服务端 `ssh-vpn-server` 参考

虽说普通的 `ssh-vpn-cli server` 可以在客户端进程内随手拉起个服务，但这只适合尝鲜测试。**真正的生产环境与路由器（如 OpenWrt）节点部署，务必要使用此专门强化的 `ssh-vpn-server` 二进制程序。**

## 随调参数 (Flags)

```bash
ssh-vpn-server [参数] [子命令]
```

| 参数 | 说明 | 默认值 |
|---|---|---|
| `-port` | 覆写监听的 SSH 端口号。 | 根据 Config 配置 |
| `-listen` | 覆写 SSH 绑定的网络接口。 | `0.0.0.0` |
| `-user` | 以覆写模式预注册一个账号名。 | |
| `-pass` | 以覆写模式配置该账号密码。 | |
| `-key` | 直接定位合法的公钥存放路径。 | |
| `-config-dir` | 保存服务运行配置数据乃至日志的本地目录。 | `~/.ssh-vpn` |

## 子命令 (Subcommands)

`ssh-vpn-server` 自带强大的后台常驻管理功能，不再需要您去手写复杂的 `systemd` 脚本即可实现开机开洞与崩溃重启。

| 命令 | 描述 |
|---|---|
| `service install` | 将服务端注册为宿主机的原生后台服务 (支持 Systemd, OpenRC 等)。**这行命令将会自动捕获并固化当前命令行暴露的系统环境变量。** |
| `service start` | 启动已经注册到系统后台的 VPN 服务。 |
| `service stop` | 停止后台服务。 |
| `service restart` | 强行重启后台服务。 |
| `service uninstall`| 清除所有注册轨迹，解除开机自启。 |
| `user add <name>` | 安全添加或更新内部连接使用凭证。 |
| `user del <name>` | 踢人并删除凭证。 |
| `user list` | 列表查看被注册了的所有授权人员。 |
| `status` | 实时的服务器审计：查看当前有多少条活跃 VPN 线路，最近一次超限阻挡次数等运行指标。 |

---

## 高级环境与内存调优参数 (Environment Variables)

如果在 64MB 这种极其磕碜的嵌入式网关上运行，我们需要用到 Golang 官方的 runtime 魔法以及本服务精细调优的 TCP 阀门限制，阻止设备遭遇内存灾难 (OOM)。

### Go 运行态阈值限制

| 变量 | 推荐数值 (128MB设备的标准) | 说明 |
|---|---|---|
| `GOMEMLIMIT` | `15MiB` | 设置一个内存“软天花板”。只要接近这个用量，本程序就会疯狂加速 GC（垃圾回收），不占主设备资源。 |
| `GOGC` | `50` | 当未回收的内存增长原来 50% 的时候强制触发大回收（默认标准为 100）。数值越低内存越低，但略微消耗 CPU。 |
| `GOMAXPROCS` | `1` | 将 Go 微线程调度器锁死在单核架构内。在嵌入式平台上极其有用，砍掉了多核上下文切换的损耗！ |

### SSH 连接防火墙调校

| 变量 | 默认值 | 说明 |
|---|---|---|
| `SSHVPN_SSHD_MAX_DIRECT_GLOBAL` | `2048` | 全局允许并存的 TCP 活跃隧道综合上限。如果是老旧路由器请死死卡在 ~128 左右即可。 |
| `SSHVPN_SSHD_MAX_DIRECT_PER_CONN` | `64` | **防单用户滥用机制。** 限制同一个授权人能疯狂开启多少个管道。 |
| `SSHVPN_SSHD_DIAL_TIMEOUT` | `10s` | 发向最终目的地（如下游网站）的网络拨号死等耐心时间。 |
| `SSHVPN_SSHD_DIAL_KEEPALIVE` | `30s` | 隧道操作系统层面的存活嗅探扫描周期。 |
| `SSHVPN_SSHD_RELAY_IDLE_TIMEOUT` | `5m` | 修剪枯枝期。若下游某一条转发连接默默无闻长达此时间（没有报文活动），服务端会主动无情砍杀以释放资源。 |

*小提示：在您执行 `ssh-vpn-server service install` 时，程序会自动嗅探以上你提前 `export` 导出的上述优化参数，并永久缝合进后台系统的守护文件里！*
