## Context

The `ssh-vpn-wiki` is a single-product VitePress site focusing on Easy Connect SSH. The request is to add `ssh-vpn-assist` (Easy Link Assist / 易连友助) as a new product, and update the legal terms to cover both products.

## Goals / Non-Goals

**Goals:**
- Update VitePress layout, sidebar, and nav configuration to handle multiple products.
- Provide complete English and Chinese guides for Easy Link Assist.
- Update home page, pricing page, and download page to be multi-product aware.
- Revise English and Chinese versions of the Terms of Service, Privacy Policy, and Subscription agreements to legally cover both products.

**Non-Goals:**
- Rewriting the application source code of `ssh-vpn` or `ssh-vpn-assist`.
- Modifying VitePress build scripts or changing VitePress to another framework.

## Decisions

### Decision 1: VitePress Multi-Product Setup
- **Approach**: Leverage standard VitePress multi-sidebar configurations by defining route-based paths (e.g. `/guide/` for Easy Connect SSH, `/assist/` for Easy Link Assist). The `nav` will contain direct dropdown links to each product's guides.
- **Alternative**: Build completely separate VitePress sites or sub-folders with custom themes.
- **Why**: Route-based path sidebar configuration is native in VitePress, cleaner to maintain, and works perfectly for internationalization and simple scaling.

### Decision 2: Integrated Legal Agreements
- **Approach**: Rather than having separate legal files per product (which bloats terms and causes redundancy), we will keep one unified set of agreements under `/legal/` and `/zh/legal/` that clearly lists terms for both products, highlighting specific differences like Easy Link Assist's remote control / accessibility permissions and end-to-end encryption.
- **Alternative**: Create `/legal/ssh-vpn/...` and `/legal/ssh-vpn-assist/...`.
- **Why**: A unified agreement is more professional, easier for a single legal entity to present, and avoids duplicate pages.

### Decision 3: Multi-Product Home and Landing Pages
- **Approach**: Update the home page `/` and `/zh/` using VitePress's homepage hero and features, listing both Easy Connect SSH (for VPN remote access) and Easy Link Assist (for technical support & remote control). Similarly, update `/download` and `/pricing` with distinct sections/tabs/tables comparing or detailing each product.

## Risks / Trade-offs

- **[Risk]** Multi-product navigation becomes cluttered on mobile screen sizes. → **[Mitigation]** Group guide links under neat dropdowns or separate sidebar sections.
- **[Risk]** Concurrently updating legal terms might accidentally weaken existing Easy Connect SSH terms. → **[Mitigation]** Carefully keep the original network security and compliance terms intact while adding specific terms for remote control safety.
