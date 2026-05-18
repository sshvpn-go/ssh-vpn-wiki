---
layout: home

hero:
  name: "易连系统 Suite"
  text: "安全联网与远程协助"
  tagline: 专业的多平台安全 SSH 隧道联网工具与端到端加密远程技术支持/屏幕控制解决方案。
  image:
    src: /logo.png
    alt: 易连系统 Logo
  actions:
    - theme: brand
      text: 易连助手使用指南
      link: /zh/guide/client-usage
    - theme: sponsor
      text: 易连友助使用指南
      link: /zh/assist/guide
    - theme: alt
      text: 软件下载
      link: /zh/download

features:
  - title: 可靠的 SSH 加密传输
    details: 在您的设备与可信服务器之间建立 SSH 隧道，支持轻量 SOCKS5 与系统级 TUN 路由模式。
    icon: 🔒
  - title: 实时屏幕画面共享
    details: 采用先进的超低延迟画面同步技术，支持自适应分辨率和画质（流畅/清晰/超清）无缝切换。
    icon: 📺
  - title: 安全远程指令注入
    details: 在您的授权下，协助者可通过无障碍或辅助功能模拟点击和滑动，物理级极简退出保障掌控权。
    icon: 🖱
  - title: 双开并发运行
    details: 独立运行的“请求协助”和“协助他人”模块，允许您在共享屏幕的同时远程协助第三人。
    icon: 🔁
  - title: 端到端加密 (E2EE)
    details: 通道基于 TLS 1.3 及 AES-256 位加密设计，中转节点不参与数据帧解密。
    icon: 🛡️
  - title: 极简客户端与快速连接
    details: 支持 Android、iOS、Windows、macOS 和 Linux。一处配置全端同步，实现快速连接。
    icon: 🚀
---

<div class="visual-showcase">

## 📦 易连产品家族 (Our Product Family)

我们提供针对不同业务场景的连接与协助工具，帮助您打破地理与设备的限制。

<div class="device-row">
  <!-- 易连助手卡片 -->
  <div class="device-container shadow-section" style="max-width: 420px; padding: 2rem; border: 1px solid var(--vp-c-divider); text-align: left; margin: 0;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: var(--vp-c-brand-1);">⚡ 易连助手 (Easy Connect SSH)</h3>
    <p style="font-size: 0.95rem; color: var(--vp-c-text-2); min-height: 80px;">
      一款跨平台 SSH 图形客户端，面向开发与运维场景。可安全连接内部测试机、代码仓库、堡垒机或自建的 SSH 接入节点。
    </p>
    <a href="/zh/guide/client-usage" style="display:inline-block; margin-top: 1rem; color: var(--vp-c-brand-1); font-weight:600;">浏览助手指南 →</a>
  </div>
  
  <!-- 易连友助卡片 -->
  <div class="device-container shadow-section" style="max-width: 420px; padding: 2rem; border: 1px solid var(--vp-c-divider); text-align: left; margin: 0;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: var(--vp-c-brand-2);">🛠️ 易连友助 (Easy Link Assist)</h3>
    <p style="font-size: 0.95rem; color: var(--vp-c-text-2); min-height: 80px;">
      一款定位于多终端互联的高性能远程技术支持与控制工具。支持高清画面同步、安全辅助服务控制及端到端强加密。
    </p>
    <a href="/zh/assist/guide" style="display:inline-block; margin-top: 1rem; color: var(--vp-c-brand-2); font-weight:600;">浏览友助指南 →</a>
  </div>
</div>

</div>

<div class="content-container shadow-section">

## 👥 目标人群

易连系统服务于多维度场景，无论是极客开发运维，还是非技术的亲友协助，均能游刃有余：

- **开发者与运维团队**：通过 **易连助手** 安全访问开发机、公司内部服务，并能在弱网环境下自动断线重连。
- **技术支持与客服团队**：通过 **易连友助** 为用户或亲友提供实时的远程系统诊断、配置演示与操作辅导。
- **家庭亲友日常互助**：子女可以轻松远程接入年迈父母的手机或电脑，指导和演示复杂的移动应用操作。
- **合规审计高度敏感行业**：所有信道全部基于端到端强加密，并内置物理级“杀手开关”以随时随地掌控设备所有权。

</div>

<div class="content-container shadow-section">

## 🎯 核心优势与合规

### 💻 快速建立连接
无论是配置复杂的 SSH 隧道，还是开启屏幕共享会话，图形界面精简流畅，支持便捷保存连接凭证与信任白名单。

### 🤝 随时中断的物理级“杀手开关”
在接受协助时，主控端在您屏幕上进行的每一个操作均有半透明视觉轨迹可寻。您只需轻轻摇晃设备或点击悬浮窗，系统会即刻切断物理信道并销毁授权。

### 🔒 智能敏感数据自动遮蔽
安全隐私探测功能，在远程协助过程中，当系统弹出密码输入框、验证码短信、银行卡号或支付界面时，将自动遮蔽画面，防范资金和账户资产泄露。

</div>

<script setup>
</script>

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
.VPHome .content-container h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.VPHome .content-container h3 {
  color: var(--vp-c-brand-1);
}
</style>
