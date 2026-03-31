import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ssh-vpn",
  description: "The next generation VPN leveraging SSH.",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // 4.1 SEO Meta Tags
    ['meta', { name: 'keywords', content: 'vpn, ssh, open-source, proxy, secure networking' }],
    ['meta', { property: 'og:title', content: 'ssh-vpn - Modern SSH-based VPN' }],
    ['meta', { property: 'og:description', content: 'Fast, secure, and multi-platform VPN using standard SSH protocols.' }],
    // 4.3 Setup hreflang pointing to root languages for proper SEO
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://ssh-vpn.xinghui.club/' }],
    ['link', { rel: 'alternate', hreflang: 'zh', href: 'https://ssh-vpn.xinghui.club/zh/' }]
  ],
  sitemap: {
    // 4.2 Automatic Sitemap Generation
    hostname: 'https://ssh-vpn.xinghui.club'
  },
  // 1.3 Dual language configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Download', link: '/download' },
          { text: 'Guide', link: '/guide/client-usage' },
          { text: 'Pricing', link: '/pricing' },
          { text: 'About', link: '/about' }
        ],
        sidebar: [
          {
            text: 'Guides',
            items: [
              { text: 'Client Usage', link: '/guide/client-usage' },
              { text: 'Server Usage', link: '/guide/server-usage' },
              { text: 'SSH Configuration', link: '/guide/ssh-config' },
              { text: 'CLI Reference', link: '/guide/cli-reference' }
            ]
          }
        ],
        editLink: {
          pattern: 'https://github.com/xinghui-tech/ssh-vpn-wiki/edit/main/src/:path',
          text: 'Edit this page'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: "ssh-vpn",
      description: "基于 SSH 的下一代虚拟专用网络",
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '下载', link: '/zh/download' },
          { text: '指南', link: '/zh/guide/client-usage' },
          { text: '价格', link: '/zh/pricing' },
          { text: '关于', link: '/zh/about' }
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '客户端使用指南', link: '/zh/guide/client-usage' },
              { text: '服务端使用指南', link: '/zh/guide/server-usage' },
              { text: 'SSH 配置指南', link: '/zh/guide/ssh-config' },
              { text: 'CLI 命令行指南', link: '/zh/guide/cli-reference' }
            ]
          }
        ],
        editLink: {
          pattern: 'https://github.com/xinghui-tech/ssh-vpn-wiki/edit/main/src/:path',
          text: '编辑此页'
        },
        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        },
        outline: {
          label: '页面导航'
        },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题'
      }
    }
  },
  themeConfig: {
    logo: '/logo.png', // 1.2 Uses the custom logo from public directory
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xinghui-tech/ssh-vpn-wiki' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present ssh-vpn Contributors'
    }
  }
})
