## 1. Repository and Pages setup

- [X] 1.1 Confirm `pnpm-lock.yaml` is tracked on `main` (required for `pnpm install --frozen-lockfile` in CI).
- [X] 1.2 In GitHub: **Settings → Pages → Build and deployment**, set source to **GitHub Actions** (not “Deploy from a branch”). See README “Deploy to GitHub Pages”.

## 2. Workflow implementation

- [X] 2.1 Add `.github/workflows/deploy-pages.yml` (or equivalent name) with `on: push: branches: [main]` and optional `workflow_dispatch`.
- [X] 2.2 **Build job**: `actions/checkout`, `pnpm/action-setup` with version matching `package.json` `packageManager`, `actions/setup-node` with `cache: 'pnpm'` and an LTS Node version, `pnpm install --frozen-lockfile`, `pnpm run build`.
- [X] 2.3 Upload static output with `actions/upload-pages-artifact` from path `src/.vitepress/dist`.
- [X] 2.4 **Deploy job**: `needs` the build job; environment `name: github-pages` (if required by org policy); `permissions` include `pages: write`, `id-token: write`; use `actions/deploy-pages`.
- [X] 2.5 Set workflow-level or job-level `permissions` for least privilege (`contents: read` for build; deploy job as above).

## 3. VitePress base path

- [X] 3.1 Decide deploy URL: custom domain / org root (`base: '/'`) vs project Pages (`base: '/<repo-name>/'`). Update `src/.vitepress/config.mts` (and head icon path if needed) so assets match the live URL per design. Production: `https://ssh-vpn.xinghui.club` with default `base` `/`; no change required.

## 4. Verification

- [X] 4.1 Push to `main` and confirm the workflow completes; open the GitHub Pages URL and verify homepage, one inner route, and zh locale load without 404 on assets.
- [X] 4.2 If deploy fails, check **Actions** logs for permissions or artifact path errors and adjust.
