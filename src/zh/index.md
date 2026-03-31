---
layout: home

hero:
  name: "ssh-vpn"
  text: "基于标准 SSH 协议的现代、快速且安全的远程接入客户端"
  tagline: 面向远程运维、企业内网接入与受控开发环境的安全 SSH 隧道工具。
  image:
    src: /logo.png
    alt: ssh-vpn Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/client-usage
    - theme: alt
      text: 客户端下载
      link: /zh/download
    - theme: alt
      text: 前往 GitHub
      link: https://github.com/xinghui-tech/ssh-vpn-wiki/

features:
  - title: 可靠的 SSH 传输
    details: 基于久经考验的 SSH 协议，在您的设备与可信服务器之间建立加密通道，满足远程接入与运维场景的安全需求。
    icon: 🔒
  - title: 稳定的连接体验
    details: 优化的连接建立与重连流程，在桌面端和移动端都能提供稳定、流畅的使用体验。
    icon: ⚡️
  - title: 适配开发与运维流程
    details: 既可以连接公司跳板机、测试环境和内部服务，也适合接入自建 SSH 服务器完成日常开发与维护任务。
    icon: 🤖
  - title: 极简客户端与多端同步
    details: 专为用户打造的跨平台直观图形界面 (Windows/macOS/Linux/Mobile)，三秒完成首次连接。
    icon: 📱
  - title: 灵活的路由模式
    details: 支持轻量 SOCKS5 模式与系统级 TUN 模式，可按需启用本地网络直连与自定义 DNS 配置。
    icon: 🧭
  - title: 服务端一键部署
    details: 使用标准 SSH 服务快速搭建自管接入节点，无需维护复杂的证书体系。
    icon: 🚀
---

<div class="visual-showcase">

## 🖥️ 视觉体验 (Cross-Platform Experience)

无论是在 4K 桌面显示的宽广视野，还是在手机屏幕上的便捷操作，ssh-vpn 都能为您提供一致且流畅的交互体验。

<div class="device-row">
  <div class="device-container device-pc">
    <div class="glow-effect"></div>
    <img src="../public/images/pc/home.jpg" alt="ssh-vpn Desktop Home">
  </div>
  <div class="device-container device-mobile">
    <div class="glow-effect"></div>
    <img src="../public/images/mobile/home.jpg" alt="ssh-vpn Mobile Home">
  </div>
</div>

*一处配置，全端同步。享受 SSH 所带来的极简连接魅力。*

</div>

<div class="content-container shadow-section">

## 👥 目标人群

无论您是开发者、运维工程师还是企业 IT 管理者，ssh-vpn 都适用于明确、合规的远程接入场景：

- **开发者**：安全连接内部代码仓库、测试环境、制品仓库和远程 Linux 主机。
- **IT 运维工程师**：为团队提供到堡垒机、维护网络和运维工具的轻量化 SSH 接入能力。
- **企业远程办公人员**：在授权前提下访问公司门户、数据库、发布环境和内部后台。
- **测试与验证团队**：在开发与预发布环境中复现受控网络路径，辅助功能验证与排障。
- **安全意识较强的用户**：在公共 Wi-Fi 等不可信本地网络中，为已获授权的系统访问增加一层加密保护。
- **自建基础设施使用者**：配合自有服务器使用，保留对链路和配置的完整可审计性。

</div>

<div class="content-container shadow-section">

## 🎯 应用场景

### 🧰 受控开发环境接入
通过保存好的 SSH 配置，安全访问远程开发机、内部制品源和企业工具链。SOCKS5 与 TUN 两种模式分别适合应用级和系统级工作流。

### 💻 高效的远程办公与运维
通过 ssh-vpn 建立的加密隧道，您可以在授权前提下安全访问公司内部系统、数据库和测试机，并在网络波动时保持较好的连接稳定性。

### 🛡️ 公共网络下的安全保护
ssh-vpn 可将敏感业务流量封装在成熟的 SSH 加密连接中，降低在不可信局域网中的被窃听与篡改风险。

### 🌐 面向各地区的合规使用
ssh-vpn 面向国际化使用场景，但具体部署和使用应遵守安装地、运营地和使用地适用的法律法规，以及组织内部的安全与合规要求。

</div>

<style>
.shadow-section {
  padding: 4rem 2rem;
  margin-top: 2rem;
  border-radius: 24px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.shadow-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}
.content-container h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.content-container ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.content-container li {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--vp-c-gutter);
}
.content-container h3 {
  margin-top: 2rem;
  color: var(--vp-c-brand-1);
}
</style>
