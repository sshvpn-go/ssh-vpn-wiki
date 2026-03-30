## Context

The `vpn-go` project requires a public-facing website (code-named "sshvpn") to serve both as a product landing page and a comprehensive documentation portal. Currently, there is a lack of centralized documentation and promotional material, making user onboarding and product discovery difficult. The new site will reside in the `vpn-go-wiki/src` directory. It must be modern, fast, SEO-friendly, and support multi-language (English and Chinese).

## Goals / Non-Goals

**Goals:**
- Provide a responsive, beautifully designed product homepage.
- Create structured documentation sections: Download, Client guide, Server guide, SSH config, Pricing, About.
- Ensure out-of-the-box SEO optimization and GEO routing support.
- Fully support i18n (Internationalization) for English (`en`) and Chinese (`zh-CN`).
- Fast static site generation for easy hosting and deployment (e.g., via GitHub Pages, Cloudflare Pages, Vercel).

**Non-Goals:**
- Implementing a complex dynamic dashboard with a backend (this is purely a static promotion/docs site).
- Handling actual payment processing directly on the site (Pricing page will link to external payment gateways or user portals).

## Decisions

**1. Static Site Generator: VitePress**
- **Rationale**: VitePress is specifically designed for technical documentation and minimalist landing pages. It has an extremely fast build process, robust built-in i18n support, and a responsive, modern default theme that requires very little tweaking to look premium. It outputs highly optimized static HTML, ensuring top-tier SEO performance.
- **Alternatives Considered**: 
  - *Docusaurus*: Great feature set, but heavier React payload compared to Vue/VitePress. 
  - *Astro / Starlight*: Excellent performance, but VitePress has slightly better out-of-the-box defaults for purely technical docs combined with a clean landing page.

**2. SEO and GEO Optimization**
- **Rationale**: We will leverage VitePress's built-in hooks for meta tags, canonical URLs, and `sitemap` generation. For GEO routing, we will rely on the deployment platform's edge capabilities (e.g., Cloudflare Pages edge rules or Vercel routing) to serve the site from the closest edge node and smoothly redirect to the correct localized path (`/zh/`) based on the user's `Accept-Language` header or IP geo-location.

**3. Content Structure**
- English will be the default fallback language at the root (`/`), with Simplified Chinese at (`/zh/`).
- Markdown will be used for all content pages, empowering non-developers to easily contribute content updates.

## Risks / Trade-offs

- **[Risk] Complex Custom Landing Page UI** $\rightarrow$ *Mitigation*: While the default VitePress theme provides a decent homepage block, we will build custom Vue components specifically for the interactive elements of the landing page to provide that "WOW" factor.
- **[Risk] SEO Indexing across languages** $\rightarrow$ *Mitigation*: rigorously ensure `hreflang` tags and canonical meta tags are injected into the site layout to prevent duplicated content penalties across the different language versions.

## Open Questions
- Where will the site ultimately be hosted? This impacts how the specific GEO routing (Edge Middleware) is configured.
- Do we already have finalized branding assets (logo, product screenshots) for "sshvpn"?
