---
layout: home

hero:
  name: "Easy Connect Systems"
  text: "Connectivity Suite"
  tagline: Professional solutions for secure SSH remote connectivity and real-time remote technical support.
  image:
    src: /logo.png
    alt: Easy Connect Suite Logo
  actions:
    - theme: brand
      text: Easy Connect SSH Guide
      link: /guide/client-usage
    - theme: sponsor
      text: Easy Link Assist Guide
      link: /assist/guide
    - theme: alt
      text: Downloads
      link: /download

features:
  - title: Secure SSH Tunneling
    details: Protect infrastructure traffic using secure SSH-based TUN or SOCKS5 proxies on Windows, macOS, Linux, and mobile devices.
    icon: 🔒
  - title: Remote Screen Sharing
    details: View client devices in real time with high-fps video and auto-adapting resolutions over secure encrypted channels.
    icon: 📺
  - title: Direct Remote Control
    details: Click, swipe, and interact directly on target screens (via Accessibility services) to guide or resolve device issues.
    icon: 🖱
  - title: Dual-Role Concurrency
    details: Unique double-sided mechanism allowing users to concurrently share their screen and control another device.
    icon: 🔁
  - title: End-to-End Encryption
    details: Underpinned by TLS 1.3 and AES-256 to guarantee absolute data security and complete user privacy.
    icon: 🛡️
  - title: Clean & Fast Deployments
    details: Stand up self-managed endpoints with single-command Docker images or use our globally optimized relay nodes.
    icon: 🚀
---

<div class="visual-showcase">

## 📦 Our Product Family

Explore our robust tools built to meet your remote connectivity and technical assistance requirements.

<div class="device-row">
  <!-- Product 1 Card -->
  <div class="device-container shadow-section" style="max-width: 420px; padding: 2rem; border: 1px solid var(--vp-c-divider); text-align: left; margin: 0;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: var(--vp-c-brand-1);">⚡ Easy Connect SSH</h3>
    <p style="font-size: 0.95rem; color: var(--vp-c-text-2); min-height: 80px;">
      A cross-platform SSH client for secure remote administration, corporate bastion host access, and self-hosted secure development pipelines.
    </p>
    <a href="/guide/client-usage" style="display:inline-block; margin-top: 1rem; color: var(--vp-c-brand-1); font-weight:600;">Explore SSH Guides →</a>
  </div>
  
  <!-- Product 2 Card -->
  <div class="device-container shadow-section" style="max-width: 420px; padding: 2rem; border: 1px solid var(--vp-c-divider); text-align: left; margin: 0;">
    <h3 style="margin-top:0; font-size: 1.5rem; color: var(--vp-c-brand-2);">🛠️ Easy Link Assist</h3>
    <p style="font-size: 0.95rem; color: var(--vp-c-text-2); min-height: 80px;">
      An interactive remote support system enabling real-time screen sharing, secure accessibility remote control, and end-to-end encrypted screen streams.
    </p>
    <a href="/assist/guide" style="display:inline-block; margin-top: 1rem; color: var(--vp-c-brand-2); font-weight:600;">Explore Remote Assist Guides →</a>
  </div>
</div>

</div>

<div class="content-container shadow-section">

## 👥 Who is it for?

Our suite serves multiple scenarios across corporate administration, agile development, and interactive peer assistance:

- **Developers & DevOps**: Access internal databases, code repositories, staging servers, and remote bastions securely using **Easy Connect SSH**.
- **IT Support & Operations**: Remotely diagnose and troubleshoot systems, configure software, or guide clients directly through **Easy Link Assist**.
- **Family Helpers**: Establish secure connections with relatives or friends to help them navigate complex settings on their mobile or desktop devices.
- **Security Audit Teams**: Rely on full end-to-end encrypted tunnels (TLS 1.3 / AES-256) and local network exclusions to comply with enterprise standards.

</div>

<div class="content-container shadow-section">

## 🎯 Use Cases

### 💻 Secure Work-From-Home Tunnels
Connect to internal company systems, corporate bastions, or cloud staging clusters using saved SSH profiles with a 3-second connection speed.

### 🤝 Secure Remote Help & Operations
Help others troubleshoot their devices or receive trusted help remotely. Our physical **"Kill Switch"** (shake device or tap the floating orb) instantly cuts all communication channels for security.

### 🔒 Sensitive Data Protection
Enjoy automatic privacy masking: during remote support, our system auto-blurs payment grids, passwords, and sensitive OTP text messages.

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
