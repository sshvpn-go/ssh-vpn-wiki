## ADDED Requirements

### Requirement: Core Product Pages
The documentation site MUST include Markdown sources for Home, Download, Client Guide, Server Guide, SSH Config, Pricing, and About Us.

#### Scenario: Navigating to the Download page
- **WHEN** the user clicks the "Download" link in the navigation bar
- **THEN** the Download page is rendered showing client binaries for all supported platforms.

### Requirement: Bilingual Content
Every core product page MUST have both an English version (under `/src/`) and a Chinese version (under `/src/zh/`).

#### Scenario: Accessing the Chinese SSH Config Guide
- **WHEN** the user visits `/zh/guide/ssh-config`
- **THEN** they see the Chinese translation of the SSH Configuration guide.
