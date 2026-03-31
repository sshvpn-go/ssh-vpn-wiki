---
layout: home

hero:
  name: "EasyConnect SSH"
  text: "Code name: ssh-vpn"
  tagline: Secure SSH tunneling for remote administration, internal network access, and protected development workflows.
  image:
    src: /logo.png
    alt: EasyConnect SSH Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/client-usage
    - theme: alt
      text: Download Client
      link: /download
    - theme: alt
      text: View on GitHub
      link: https://github.com/xinghui-tech/ssh-vpn-wiki/

features:
  - title: Secure SSH Transport
    details: Leverages the battle-tested SSH protocol to protect traffic between your device and trusted infrastructure with enterprise-grade encryption.
    icon: 🔒
  - title: Reliable Remote Access
    details: Connect to your own server, a company bastion host, or a managed development environment with a consistent user experience.
    icon: 🤖
  - title: Intuitive GUI Experience
    details: A cross-platform graphical client for Windows, macOS, Linux, and Mobile. Connect in exactly three seconds.
    icon: 📱
  - title: Flexible Routing Modes
    details: Choose between a lightweight SOCKS5 proxy or system-level TUN mode, with local-network exclusions and custom DNS options for managed environments.
    icon: 🧭
  - title: Easy Server Deployment
    details: Deploy a self-managed SSH access endpoint with a single command, without maintaining a complex certificate stack.
    icon: 🚀
  - title: Open Source & Free
    details: Transparent, open-source under the MIT license. Audit the code and deploy it freely on your own infrastructure.
    icon: 🌍
---

<div class="visual-showcase">

## 🖥️ Cross-Platform Experience

From the expansive real estate of a 4K desktop to the portability of a mobile screen, EasyConnect SSH provides a consistent and fluid user experience across all your devices.

<div class="device-row">
  <div class="device-container device-pc">
    <div class="glow-effect"></div>
    <img src="./public/images/pc/home.jpg" alt="EasyConnect SSH Desktop Home">
  </div>
  <div class="device-container device-mobile">
    <div class="glow-effect"></div>
    <img src="./public/images/mobile/home.jpg" alt="EasyConnect SSH Mobile Home">
  </div>
</div>

*One configuration, all devices synced. Experience the simplicity of SSH-based networking.*

</div>

<div class="content-container shadow-section">

## 👥 Who is it for?

Whether you are a developer, a sysadmin, or an IT operator, EasyConnect SSH is built for legitimate remote access and internal connectivity scenarios:

- **Developers**: Reach internal package mirrors, staging systems, and remote Linux hosts from a single desktop or mobile client.
- **IT Operations**: Provide staff with a lightweight SSH-based path to bastion hosts, maintenance networks, and operational tooling.
- **Enterprise Teams**: Protect access to internal portals, databases, and admin consoles when working remotely.
- **QA & Testers**: Reproduce managed network paths for application validation in development and pre-production environments.
- **Security-Conscious Users**: Protect traffic on untrusted local networks when connecting to systems you are authorized to use.
- **Self-Hosted Enthusiasts**: Run the client against infrastructure you control and audit the full stack end to end.

</div>

<div class="content-container shadow-section">

## 🎯 Use Cases

### 🧰 Managed Development Access
Use a saved SSH profile to reach remote development machines, package registries, or internal tooling over an encrypted tunnel. SOCKS5 and TUN modes cover both app-specific and system-level workflows.

### 💻 Smarter Remote Work
Access internal corporate portals, databases, and staging servers securely. EasyConnect SSH remains suitable for remote administration and field work where network quality can vary.

### 🛡️ Protected Connections
Wrap sensitive traffic in battle-tested SSH encryption to reduce exposure on untrusted local networks and public hotspots.

### 🌐 Regional Compliance
EasyConnect SSH is intended for international use, but every deployment should follow the laws, regulations, and organizational rules that apply in the region where it is installed and operated.

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
