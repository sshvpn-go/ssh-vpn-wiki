## MODIFIED Requirements

### Requirement: Core Product Pages
The documentation site MUST include Markdown sources for Home, Download, Client Guide, Server Guide, SSH Config, Pricing, and About Us, as well as the newly added Easy Link Assist Guides and Legal Agreements.

#### Scenario: Navigating to the Download page
- **WHEN** the user clicks the "Download" link in the navigation bar
- **THEN** the Download page is rendered showing client binaries for all supported products (Easy Connect SSH and Easy Link Assist) and platforms.

#### Scenario: Reviewing Legal Agreements
- **WHEN** the user navigates to the Legal section (Terms, Privacy, Subscription)
- **THEN** the pages render comprehensive legal terms compatible with both products, highlighting any specific terms for Easy Link Assist (such as remote control permissions and secure encryption).

### Requirement: Bilingual Content
Every core product page, including Easy Link Assist guides and legal agreements, MUST have both an English version (under `/src/`) and a Chinese version (under `/src/zh/`).

#### Scenario: Accessing the Chinese SSH Config Guide
- **WHEN** the user visits `/zh/guide/ssh-config`
- **THEN** they see the Chinese translation of the SSH Configuration guide.

#### Scenario: Accessing the Chinese Easy Link Assist Legal Terms
- **WHEN** the user visits `/zh/legal/terms`
- **THEN** they see the updated Chinese Terms of Use, fully compatible with both Easy Connect SSH and Easy Link Assist.
