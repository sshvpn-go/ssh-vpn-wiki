import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Easy Connect SSH",
  description: "Easy Connect SSH is an SSH-based remote access client for international teams, lawful internal connectivity, and compliant operations.",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // 4.1 SEO Meta Tags
    ['meta', { name: 'keywords', content: 'Easy Connect SSH, VPN,ssh-vpn, ssh remote access, ssh tunnel, open-source, proxy, secure networking' }],
    ['meta', { property: 'og:title', content: 'Easy Connect SSH - SSH-Based Remote Access Client' }],
    ['meta', { property: 'og:description', content: 'Easy Connect SSH is a fast, secure, and multi-platform SSH-based remote access client for internal connectivity and operations.' }],
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
          {
            text: 'Guides',
            items: [
              { text: 'Easy Connect SSH', link: '/guide/client-usage' },
              { text: 'Easy Link Assist', link: '/assist/guide' }
            ]
          },
          { text: 'Pricing', link: '/pricing' },
          {
            text: 'Legal',
            items: [
              { text: 'Terms of Use', link: '/legal/terms' },
              { text: 'Privacy Policy', link: '/legal/privacy' },
              { text: 'Auto-Renewal Service', link: '/legal/subscription' }
            ]
          },
          { text: 'About', link: '/about' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'EasyConnect SSH',
              items: [
                { text: 'Client Usage', link: '/guide/client-usage' },
                { text: 'Server Usage', link: '/guide/server-usage' },
                { text: 'SSH Configuration', link: '/guide/ssh-config' },
                { text: 'CLI Reference', link: '/guide/cli-reference' }
              ]
            }
          ],
          '/assist/': [
            {
              text: 'Easy Link Assist',
              items: [
                { text: 'User Guide', link: '/assist/guide' }
              ]
            }
          ],
          '/legal/': [
            {
              text: 'Legal Agreements',
              items: [
                { text: 'Terms of Use', link: '/legal/terms' },
                { text: 'Privacy Policy', link: '/legal/privacy' },
                { text: 'Auto-Renewal Agreement', link: '/legal/subscription' }
              ]
            }
          ],
          '/': [
            {
              text: 'Platform Info',
              items: [
                { text: 'Download Center', link: '/download' },
                { text: 'Pricing & Plans', link: '/pricing' },
                { text: 'About Us', link: '/about' }
              ]
            }
          ]
        },
        editLink: {
          pattern: 'https://github.com/sshvpn-go/ssh-vpn-wiki/edit/main/src/:path',
          text: 'Edit this page'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: "易连系统",
      description: "星汇盛世（北京）科技有限公司旗下安全联网与远程协助产品体系（易连助手 & 易连友助）",
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '下载', link: '/zh/download' },
          {
            text: '使用指南',
            items: [
              { text: '易连助手 (Easy Connect SSH)', link: '/zh/guide/client-usage' },
              { text: '易连友助 (Easy Link Assist)', link: '/zh/assist/guide' }
            ]
          },
          { text: '价格', link: '/zh/pricing' },
          {
            text: '法律合规',
            items: [
              { text: '使用协议', link: '/zh/legal/terms' },
              { text: '隐私政策', link: '/zh/legal/privacy' },
              { text: '自动续费服务协议', link: '/zh/legal/subscription' }
            ]
          },
          { text: '关于', link: '/zh/about' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '易连助手 Guide',
              items: [
                { text: '客户端使用指南', link: '/zh/guide/client-usage' },
                { text: '服务端使用指南', link: '/zh/guide/server-usage' },
                { text: 'SSH 配置指南', link: '/zh/guide/ssh-config' },
                { text: 'CLI 命令行指南', link: '/zh/guide/cli-reference' }
              ]
            }
          ],
          '/zh/assist/': [
            {
              text: '易连友助 Guide',
              items: [
                { text: '使用指南', link: '/zh/assist/guide' }
              ]
            }
          ],
          '/zh/legal/': [
            {
              text: '法律合规',
              items: [
                { text: '使用协议', link: '/zh/legal/terms' },
                { text: '隐私政策', link: '/zh/legal/privacy' },
                { text: '自动续费服务协议', link: '/zh/legal/subscription' }
              ]
            }
          ],
          '/zh/': [
            {
              text: '平台服务',
              items: [
                { text: '下载中心', link: '/zh/download' },
                { text: '价格与订阅', link: '/zh/pricing' },
                { text: '关于我们', link: '/zh/about' }
              ]
            }
          ]
        },
        editLink: {
          pattern: 'https://github.com/sshvpn-go/ssh-vpn-wiki/edit/main/src/:path',
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
      { icon: 'github', link: 'https://github.com/sshvpn-go/ssh-vpn-wiki' }
    ],
    footer: {
      message: 'Released under the MIT License. <a href="/legal/terms">Terms</a> | <a href="/legal/privacy">Privacy</a>',
      copyright: 'Copyright © 2026-present Easy Connect SSH Contributors'
    }
  }
})
