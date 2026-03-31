## ADDED Requirements

### Requirement: Default-branch push triggers production build and deploy

The system SHALL run a GitHub Actions workflow on each push to the repository default branch (`main`) that produces a VitePress production build and deploys it to GitHub Pages.

#### Scenario: Successful deploy after push to main

- **WHEN** a commit is pushed to `main`
- **THEN** the workflow runs to completion without error
- **AND** the static files from the VitePress build output directory are published to GitHub Pages

### Requirement: Build uses pnpm and repository scripts

The workflow SHALL install dependencies with pnpm using the lockfile when present and SHALL invoke the same build command as local development (`pnpm build` / `vitepress build src` as defined in `package.json`).

#### Scenario: Reproducible install

- **WHEN** the workflow runs the install step
- **THEN** it uses pnpm as the package manager
- **AND** if `pnpm-lock.yaml` exists in the repository, the install step SHALL fail on lockfile drift rather than silently updating the lockfile (e.g. frozen lockfile behavior)

### Requirement: Minimal OIDC permissions for Pages

The workflow SHALL declare GitHub token permissions sufficient for deploying to GitHub Pages: read repository contents for checkout and build, and `pages: write` plus `id-token: write` for the deploy job as required by `actions/deploy-pages`.

#### Scenario: Deploy job permissions

- **WHEN** the deploy job runs
- **THEN** the workflow has been granted `id-token: write` and `pages: write` at the job or workflow level as needed for GitHub’s Pages deployment action

### Requirement: Published artifact matches VitePress output path

The workflow SHALL upload the directory that VitePress writes after `pnpm build`, which for this repo is `src/.vitepress/dist`, as the static artifact for GitHub Pages.

#### Scenario: Artifact contents

- **WHEN** the build step finishes successfully
- **THEN** the uploaded Pages artifact is the contents of `src/.vitepress/dist` (not the repository root and not an empty directory)

### Requirement: Base path compatible with deployment URL

The deployed site SHALL load client assets and internal links correctly for the configured GitHub Pages URL. If the site is served from a project subpath (`/<repo>/`), VitePress `base` MUST be set accordingly; if served from the domain root (custom domain or user/org root site), `base` MUST remain `/`.

#### Scenario: Asset resolution

- **WHEN** a visitor loads the deployed site’s homepage
- **THEN** stylesheets and scripts requested by the page return HTTP 200 and the SPA navigates without broken asset paths
