## 1. Project Initialization & Architecture

- [x] 1.1 Scaffold a new VitePress project inside the `vpn-go-wiki/src` directory.
- [x] 1.2 Copy/Configure `src/assets/icons/app.png` as the primary site logo and favicon in the VitePress configuration.
- [x] 1.3 Set up VitePress `config.js` or `config.ts` for dual-language support: English (`/`) and Chinese (`/zh/`).
- [x] 1.4 Configure the top navigation bar and respective global sidebars for both supported languages.

## 2. Core Enhancements & UI Components

- [x] 2.1 Create custom interactive Vue components (e.g., Features Grid, Hero Call-to-Action) to ensure the landing page feels modern and premium.
- [x] 2.2 Construct the English Homepage (`index.md`) leveraging the custom components and VitePress defaults.
- [x] 2.3 Construct the Chinese Homepage (`zh/index.md`) mirroring the English structure with translated marketing copy.

## 3. Key Content Pages (Bilingual)

- [x] 3.1 Create the Download Page (`download.md` and `zh/download.md`) cataloging VPN binaries across platforms.
- [x] 3.2 Draft the Client Usage Guide (`guide/client-usage.md` and `zh/guide/client-usage.md`).
- [x] 3.3 Draft the Server Usage Guide (`guide/server-usage.md` and `zh/guide/server-usage.md`).
- [x] 3.4 Draft the SSH Configuration Guide (`guide/ssh-config.md` and `zh/guide/ssh-config.md`).
- [x] 3.5 Create Paid Subscriptions/Purchase Details Page (`pricing.md` and `zh/pricing.md`).
- [x] 3.6 Create About Us Page (`about.md` and `zh/about.md`).

## 4. SEO & GEO Routing Configuration

- [x] 4.1 Configure VitePress `transformHead` hook to programmatically inject strong meta descriptions and social tags.
- [x] 4.2 Setup `sitemap.xml` automatic generation plugin as part of the static build process.
- [x] 4.3 Inject correct `hreflang` relationship meta tags to tie the English and Chinese versions of specific pages together for Search Engines.
- [x] 4.4 Set up the necessary edge routing rules/snippets for deployment (e.g., Cloudflare/Vercel) to route Chinese IP addresses or `Accept-Language: zh-CN` headers to `/zh/`.
