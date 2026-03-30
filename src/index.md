---
layout: home

hero:
  name: "ssh-vpn"
  text: "The modern, fast, and secure next-generation VPN built on standard SSH."
  tagline: Bypass firewalls, tunnel your connection, and seamlessly access international networks—designed for both everyday users and developers.
  image:
    src: /logo.png
    alt: ssh-vpn Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/client-usage
    - theme: alt
      text: Download Client
      link: /download
    - theme: alt
      text: View on GitHub
      link: https://github.com/ssh-vpn/ssh-vpn

features:
  - title: Next-Gen Security
    details: Leverages the battle-tested SSH protocol for enterprise-grade encryption. Naturally resists Deep Packet Inspection (DPI) and strict firewalls.
    icon: 🔒
  - title: Supercharged AI Workflows
    details: Pair with offshore servers like OpenClaw to reliably access ChatGPT, Claude, and Gemini without connection drops.
    icon: 🤖
  - title: Intuitive GUI Experience
    details: A cross-platform graphical client for Windows, macOS, Linux, and Mobile. Connect in exactly three seconds.
    icon: 📱
  - title: Advanced Routing Engine
    details: Choose between a lightweight SOCKS5 proxy or full-traffic TUN mode. Features built-in local bypass (Bypass Local) and custom DNS configurations.
    icon: 🧭
  - title: Easy Server Deployment
    details: Ditch the complex PKI and certificate infrastructure of traditional VPNs. Deploy your own server with a single command.
    icon: 🚀
  - title: Open Source & Free
    details: Transparent, open-source under the MIT license. Audit the code and deploy it freely on your own infrastructure.
    icon: 🌍
---

<div class="visual-showcase">

## 🖥️ Cross-Platform Experience

From the expansive real estate of a 4K desktop to the portability of a mobile screen, ssh-vpn provides a consistent and fluid user experience across all your devices.

<div class="device-row">
  <div class="device-container device-pc">
    <div class="glow-effect"></div>
    <img src="./public/images/pc/home.jpg" alt="ssh-vpn Desktop Home">
  </div>
  <div class="device-container device-mobile">
    <div class="glow-effect"></div>
    <img src="./public/images/mobile/home.jpg" alt="ssh-vpn Mobile Home">
  </div>
</div>

*One configuration, all devices synced. Experience the simplicity of SSH-based networking.*

</div>

<div class="content-container shadow-section">

## 👥 Who is it for?

Whether you are a developer, a sysadmin, or a privacy-conscious user, ssh-vpn is built for you:

- **AI Developers & Researchers**: Pair with OpenClaw servers for stable, high-speed access to ChatGPT, Claude, and Gemini from anywhere.
- **Global Teams**: Accelerate Git cloning (GitHub/GitLab) and seamlessly manage remote production environments.
- **Privacy Advocates**: Protect your banking and personal data on public Wi-Fi networks with military-grade SSH tunneling.
- **QA & Testers**: Easily switch between regional network environments to verify application performance across the globe.
- **Cross-border E-commerce**: Securely manage global storefronts on Amazon, Shopee, or Lazada with dedicated, localized connection stability.
- **IT Operations**: Retire bulky and easily-blocked VPN protocols. Enjoy lightweight, high-reliability infrastructure access.

</div>

<div class="content-container shadow-section">

## 🎯 Use Cases

### 🤖 Seamless AI Integration
Easily configure your OpenClaw credentials. Whether you prefer full TUN mode or a lightweight SOCKS5 proxy, ssh-vpn optimizes your AI-assisted development workflow with uncompromised stability.

### 💻 Smarter Remote Work
Access internal corporate portals, databases, and staging servers securely. ssh-vpn's optimized protocol remains stable even during high-latency mobile or satellite connections.

### 🛡️ Secure Communications
Wrap all your traffic in battle-tested SSH encryption. Defend against Man-in-the-Middle (MITM) attacks and data sniffing on unencrypted public hotspots with ease.

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
