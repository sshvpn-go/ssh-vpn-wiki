## MODIFIED Requirements

### Requirement: VitePress Foundation
The site MUST be built using VitePress with a multi-language setup, supporting `en` (default) and `zh` paths, upgraded to support multi-product dynamic navigation and sidebars.

#### Scenario: Language switching
- **WHEN** the user navigates to `/zh/index.html` or uses the language switcher
- **THEN** the site displays the Chinese localized version of the content.

#### Scenario: Product switching in sidebar
- **WHEN** the user is viewing the "Easy Link Assist" docs
- **THEN** the sidebar displays navigation items specific to "Easy Link Assist", independent of "Easy Connect SSH".

### Requirement: Custom Landing Page UI
The site architecture MUST include custom interactive Vue components for the landing page to provide a modern, premium feel, updated to support choosing between multiple products.

#### Scenario: Viewing the interactive landing page
- **WHEN** the user visits the root `/` path
- **THEN** the site displays dynamic product highlights and lets the user toggle or select between Easy Connect SSH and Easy Link Assist.
