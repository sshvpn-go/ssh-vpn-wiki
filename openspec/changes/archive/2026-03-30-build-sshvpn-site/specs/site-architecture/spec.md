## ADDED Requirements

### Requirement: VitePress Foundation
The site MUST be built using VitePress with a multi-language setup, supporting `en` (default) and `zh` paths.

#### Scenario: Language switching
- **WHEN** the user navigates to `/zh/index.html` or uses the language switcher
- **THEN** the site displays the Chinese localized version of the content.

### Requirement: Custom Landing Page UI
The site architecture MUST include custom interactive Vue components for the landing page to provide a modern, premium feel.

#### Scenario: Viewing the interactive landing page
- **WHEN** the user visits the root `/` path
- **THEN** the site displays dynamic product highlights using the custom Vue components.
