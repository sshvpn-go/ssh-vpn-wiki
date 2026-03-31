---
layout: home

hero:
  name: "ssh-vpn"
  text: "基于标准 SSH 协议的现代、快速且安全的下一代 VPN"
  tagline: 跨越防火墙、全面保护您的连接，让极客与普通小白都能享受安全自由的网络体验。
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
  - title: 卓越的安全性
    details: 基于久经考验的 SSH 协议，提供企业级加密标准与安全的网络隧道，天然抗封锁，无惧 DPI 审查。
    icon: 🔒
  - title: 极速网络体验
    details: 优化的连接路由及极低的协议开销，在低延迟的前提下释放最大网络带宽。
    icon: ⚡️
  - title: 完美适配 AI 工作流
    details: 搭配 OpenClaw (龙虾) 等海外服务器使用，帮助 AI 开发者稳定无缝访问 ChatGPT、Claude 和 Gemini 等工具。
    icon: 🤖
  - title: 极简客户端与多端同步
    details: 专为用户打造的跨平台直观图形界面 (Windows/macOS/Linux/Mobile)，三秒完成首次连接。
    icon: 📱
  - title: 高级网络路由
    details: 支持全局接管的 TUN 隧道模式，内置中国大陆直连优化（Bypass Local）与自定义 DNS 规则。
    icon: 🧭
  - title: 服务端一键部署
    details: 抛弃 OpenVPN 或 WireGuard 复杂的公钥系统，只需一行命令即可部署专属于你的服务端。
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

无论您是技术专家还是网络安全关注者，ssh-vpn 都能完美适配您的需求：

- **AI 开发者与研究者**：搭配龙虾（OpenClaw）服务器，稳定访问 ChatGPT、Claude、Gemini 等全球顶级 AI 平台。
- **跨国协作团队**：大幅加速海外代码拉取（GitHub/GitLab）速度，流畅管理远程生产服务器。
- **隐私保护倡导者**：在机场、咖啡厅等公共 Wi-Fi 环境下，通过军用级 SSH 隧道保护您的网银与社交账号安全。
- **全球业务测试员**：在不同地域的网络环境下模拟真实用户访问，确保您的应用走出国门依然丝滑。
- **跨境电商从业者**：稳定管理 Amazon、Shopee、Lazada 等海外店铺，规避因网络波动导致的账号安全风险。
- **IT 运维工程师**：告别笨重且易被识别的 OpenVPN，享受基于标准 SSH 的极简、高稳内网接入。

</div>

<div class="content-container shadow-section">

## 🎯 应用场景

### 🤖 极致的 AI 辅助开发
直接在 ssh-vpn 中填入您的龙虾服务器凭证。无论是 TUN 全流量模式还是 SOCKS5 代理模式，都能让您的本地开发环境瞬间获得全球顶尖 AI 模型的力量。

### 💻 高效的远程办公与运维
通过 ssh-vpn 建立的加密隧道，您可以像在局域网内一样安全地访问公司内部系统、数据库和测试机。其轻量化的特性，即使在网络抖动的移动办公场景下也能保持连接不断连。

### 🛡️ 公共网络下的安全堡垒
ssh-vpn 将您的所有流量包裹在成熟的 SSH 协议中。在不安全的网络环境下，它是您抵御中间人攻击（MITM）和数据泄露的最坚实盾牌。

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
