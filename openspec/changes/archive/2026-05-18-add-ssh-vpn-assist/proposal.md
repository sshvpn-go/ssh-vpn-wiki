## Why

To support the rapid expansion of the SSH-VPN ecosystem, we are introducing a new product called **Easy Link Assist** (Chinese: **易连友助**). The existing wiki and documentation site is single-product focused (on Easy Connect SSH). We need to upgrade the entire wiki platform into a unified multi-product portal that serves both Easy Connect SSH and Easy Link Assist, while ensuring all legal policies (Terms of Service, Privacy Policy, Auto-Renewal Agreement) are updated to be fully compliant and support both products concurrently.

## What Changes

- **Multi-Product VitePress Architecture**: Upgrade `.vitepress/config.mts` and related styling/layout files to support distinct sidebars, navigations, and landing pages for multiple products.
- **Easy Link Assist Product Wiki Content**: Add bilingual product guide, feature introductions, installation procedures, and usage documentation for the Easy Link Assist client application.
- **Upgraded Landing Pages**: Refactor key layout pages (Home, Download, Pricing, About) to be product-aware, directing users cleanly to either Easy Connect SSH or Easy Link Assist resources.
- **Unified Multi-Product Legal framework**: Restructure Terms of Use, Privacy Policy, and Subscription agreements to cover both products seamlessly, adding remote technical support and screen sharing specific compliance terms (e.g. access control, encryption, security warnings) for Easy Link Assist.

## Capabilities

### New Capabilities
- `easy-link-assist-content`: Guide pages, introduction, and user documentation for the new Easy Link Assist remote support product in both English and Chinese.

### Modified Capabilities
- `site-architecture`: Upgrade the site architecture and configuration from a single-product to a multi-product VitePress setup.
- `content-pages`: Refactor common pages (Home, Download, Pricing, About, and Legal Agreements) to cleanly support both products and fulfill their respective legal requirements.

## Impact

- **VitePress configuration & navigation** in `src/.vitepress/config.mts`.
- **General and Legal pages** in `src/index.md`, `src/download.md`, `src/pricing.md`, `src/about.md`, `src/legal/*` and their corresponding `/zh/` counterparts.
- **New folders and files** under `src/assist/` and `src/zh/assist/` for Easy Link Assist content.
