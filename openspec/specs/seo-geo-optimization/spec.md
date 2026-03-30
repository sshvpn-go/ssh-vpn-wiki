# SEO & GEO Optimization

## Purpose
Ensure that the SSHVPN documentation is correctly indexed by global search engines and provides a seamless localization experience for users based on their geographical location or browser language settings.

## Requirements

### Requirement: Search Engine Optimization
The site MUST automatically generate a `sitemap.xml` and include correct `hreflang` meta tags for all language variants.

#### Scenario: Search engine crawler visits the site
- **WHEN** a crawler accesses a documentation page
- **THEN** it finds `hreflang` tags pointing to both the `en` and `zh` versions of that specific page, along with optimized canonical URLs.

### Requirement: Geographical Language Routing
The hosting platform configuration MUST include edge routing criteria to redirect users to their localized path based on the `Accept-Language` header or IP geo-location.

#### Scenario: Chinese user visits the root domain
- **WHEN** a user with `Accept-Language: zh-CN` visits `/`
- **THEN** they are automatically redirected to serving correctly localized content (e.g., `/zh/`).
