## Why

The wiki is built with VitePress but has no automated path from `main` to a hosted site; publishing is manual and easy to forget. A GitHub Actions workflow fixes that by building on every push to the default branch and deploying static output to GitHub Pages.

## What Changes

- Add a GitHub Actions workflow that installs dependencies (pnpm), runs `vitepress build`, and uploads/deploys the `src/.vitepress/dist` output to GitHub Pages using the official `actions/deploy-pages` pattern.
- Document one-time repo settings (Pages source: GitHub Actions; workflow `permissions`).
- If the site is served from a project Pages URL (`/<repo>/`), align VitePress `base` in config with the repository name so assets resolve (concrete value captured in design/tasks).

## Capabilities

### New Capabilities

- `github-pages-ci`: Continuous integration and deployment of the VitePress site to GitHub Pages—workflow triggers, build steps, artifact upload, and deployment permissions.

### Modified Capabilities

- *(none — existing content and site-architecture specs are unchanged; only delivery automation is added.)*

## Impact

- Source repository: <https://github.com/xinghui-tech/ssh-vpn-wiki> (CI runs here).
- New file under `.github/workflows/`.
- Repository **Settings → Pages**: must use “GitHub Actions” as the deployment source (manual one-time step).
- Optional: `src/.vitepress/config.*` update for `base` when not deploying to a custom domain at repo root.
- No runtime dependency changes in `package.json` beyond what CI uses (pnpm, Node version pinned in workflow).
