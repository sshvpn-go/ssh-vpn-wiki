# 客户端使用指南

易连助手（EasyConnect SSH，代码 `ssh-vpn`）提供图形界面（GUI）与命令行（CLI）两种使用方式，初学者推荐直接使用跨平台的客户端软件一键连接。

## 准备工作

1. 前往 **[客户端下载页面](/zh/download)** 获取您的操作系统对应的安装包。
2. 您需要准备一个可用的 SSH 服务器凭证，例如公司跳板机、自建服务器或其他经授权可访问的环境。

## 桌面端客户端 (推荐) 🖥️

无论是为了远程接入企业内网、连接测试环境，还是执行日常运维任务，桌面客户端都能提供开箱即用的体验。

<div class="device-row" style="margin: 2rem 0;">
  <div class="device-container device-pc">
    <img src="../../public/images/pc/home.jpg" alt="桌面端主界面">
  </div>
</div>

1. **运行应用程序**：双击启动您下载好的 macOS `.dmg` 或是 Windows `.exe` 程序。
2. **添加配置**: 点击 "Add Profile" 新增节点配置。
    - **Server**: 服务器的 IP 与对应 SSH 端口（如：`8.8.8.8:22`）。
    - **用户名**: 服务器 SSH 用户名（如 `root`）。
    - **认证方式**: 
        - **SSH Key** (强烈推荐): 提供您的私钥文件路径（如 `~/.ssh/id_rsa`），安全便携。
        - **Password**: 如果您没有配置密钥，可以直接填写登录密码。
    - **代理模式**:
        - **SOCKS5 Proxy**: 在本地建立 `1080` 端口的代理通道，适合单个应用按需使用。
        - **TUN Mode**: 通过虚拟网卡承载系统级网络流量，适合整机统一接入受管控的远程环境。
3. **连接**：选择保存好的配置，点击 **Connect**。

<div class="device-row" style="margin: 2rem 0;">
  <div class="device-container device-mobile">
    <img src="../../public/images/mobile/dashboard.jpg" alt="移动端连接状态">
  </div>
</div>

> **关于 TUN 模式的系统权限说明**
> 为了让系统级流量走指定的远程接入路径，易连助手会新建一个虚拟网卡 (TUN Device)，并按需调整系统路由，同时监听 `127.0.0.1:53` 以配合 DNS 解析流程。
> **在 macOS/Windows/Linux 系统中，配置虚拟网络接口均需要管理员级/Root权限。**
> 如果您没有管理员授权，您可以使用无需提权的 **SOCKS5 代理模式**。

---

## 智能分流与规则引擎 (Smart Routing)

为了在远程接入时兼顾本地资源与内部系统访问，易连助手助手内置了智能分流引擎。您可以让局域网、内网地址或指定域名直连，同时将需要通过 SSH 隧道访问的目标交给对应规则处理。

<div class="device-row" style="margin: 2rem 0;">
  <div class="device-container device-pc" style="max-width: 500px;">
    <img src="../../public/images/pc/rules.jpg" alt="分流规则设置">
  </div>
  <div class="device-container device-mobile">
    <img src="../../public/images/mobile/rules.jpg" alt="移动端规则管理">
  </div>
</div>

- **高度兼容性**: 易连助手的规则引擎格式完全兼容业界主流的配置模式。支持 `DOMAIN` (精确域名)、`DOMAIN-SUFFIX` (域名后缀与子域名匹配)、`DOMAIN-KEYWORD` (包含特定关键词) 以及 `IP-CIDR` 路由分流等主流判断语法。
- **配置与导入**: 打开客户端设置，您可以直接导入预先编写好的分流规则集。例如，可将中国大陆 IP、本地局域网或企业内网网段配置为 `DIRECT`，从而减少不必要的隧道流量。
- **自定义阻断拦截**: 除了 `PROXY` (转发) 和 `DIRECT` (局域网直连) 以外，引擎还支持 `REJECT` 动作来主动屏蔽某些包含追踪或广告系统的网络请求。

---

<details>
<summary><b>命令行基础连接 (高级用户)</b></summary>
<br/>

如果你在没有图形界面的机器上（如另一台 Server 或路由器）运行该客户端，可以使用自带的命令行指令连接：

```bash
# 示例：一次性临时连接新服务器，强行覆盖地址与端口
ssh-vpn-cli client -host 8.8.8.8 -port 22 -mode socks5

# 示例：载入预设配置环境（如包含密钥与复杂路由的 "公司内网" Profile）来静默连接
ssh-vpn-cli -profile "公司内网" client
```

*当代理连通以后（若非使用 TUN），您可以让其他软件（如浏览器或命令行）走本地 `127.0.0.1:1080` 代理：*

- **Firefox 浏览器**设置：网络与配置 -> 手动配置代理 -> SOCKS 主机填入 `127.0.0.1` 端口 `1080`，协议选 **SOCKS v5**。
- **命令行工具 CURL**: `curl --socks5 127.0.0.1:1080 https://ip.gs`

若需查阅更完整的本地接口调用参数与守护进程状态管理，请参考 **[CLI 命令行指南](/zh/guide/cli-reference)**。
</details>
