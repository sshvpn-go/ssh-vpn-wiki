## Context

The **ssh-vpn-wiki** repo at **<https://github.com/xinghui-tech/ssh-vpn-wiki>** is a VitePress site: source under `src/`, config in `src/.vitepress/config.mts`, build via `pnpm build` (`vitepress build src`), output at `src/.vitepress/dist`. Package manager is **pnpm** (see `packageManager` in `package.json`). The public site is intended to use the hostname `https://ssh-vpn.xinghui.club` (sitemap and head metadata). Today there is no CI workflow; releases depend on manual builds.

## Goals / Non-Goals

**Goals:**

- On each push to the default branch (`main`), automatically build the VitePress site and deploy the static output to **GitHub Pages** using the **GitHub Actions → Pages** integration (`actions/upload-pages-artifact` + `actions/deploy-pages`).
- Pin a supported **Node** LTS and use **pnpm** with lockfile (`pnpm-lock.yaml`) for reproducible installs.
- Grant only the minimal workflow permissions: `contents: read`, `pages: write`, `id-token: write` (required for OIDC deploy to Pages).

**Non-Goals:**

- Migrating hosting away from GitHub Pages or supporting multiple deploy targets in one workflow.
- Changing wiki content, theme, or SEO behavior beyond what is required for correct asset URLs at the chosen Pages URL.
- Nightly or PR preview deployments (can be a follow-up).

## Decisions

1. **Single workflow file** (e.g. `.github/workflows/deploy-pages.yml`) with one job that builds and one job that deploys (pattern recommended by GitHub: build uploads artifact, deploy uses `deploy-pages`). Keeps logs clear and matches GitHub’s documented split.

2. **pnpm via `pnpm/action-setup`** then `actions/setup-node` with `cache: 'pnpm'`. Aligns with the repo’s declared package manager and avoids npm/yarn drift.

3. **Deploy directory: `src/.vitepress/dist`** after `pnpm build`. Matches current VitePress layout and `package.json` script.

4. **`base` in VitePress**  
   - For deployment at **site root** (custom domain `ssh-vpn.xinghui.club` or `https://<org>.github.io/` user/org site), **`base` SHALL remain `/`** (current effective default).  
   - For **project Pages** only (`https://<user>.github.io/<repo>/`), the design SHALL set `base` to `/<repository-name>/` (or use env-driven `base` in config) so assets resolve. **Implementation** chooses based on how Pages is configured: document in tasks that operators set custom domain vs project URL and adjust `base` once if needed.

5. **Trigger: `push` to `main`** (and optionally `workflow_dispatch` for manual reruns). No need to deploy on every PR unless requirements change later.

6. **Alternatives considered**  
   - *Peaceiris/actions-gh-pages*: popular but pushes to `gh-pages` branch; `deploy-pages` avoids extra branch and matches GitHub’s native artifact flow.  
   - *Netlify/Vercel*: out of scope (non-goal).

## Risks / Trade-offs

- **Wrong `base` for project Pages** → Broken CSS/JS. *Mitigation*: Document the custom-domain vs `/repo/` case in tasks; verify first deploy in staging or with a throwaway fork.  
- **Missing GitHub Pages settings** → Workflow succeeds but site not served. *Mitigation*: Tasks include enabling **Settings → Pages → Build and deployment: GitHub Actions**.  
- **Lockfile missing or outdated in CI** → Install failures. *Mitigation*: Use `pnpm install --frozen-lockfile` only if `pnpm-lock.yaml` is committed; otherwise document committing the lockfile as part of setup.

## Migration Plan

1. Merge workflow and any `base` config tweak.  
2. In GitHub: enable Pages with **GitHub Actions** as source.  
3. Push to `main`; confirm **Actions** tab shows success and **Pages** URL loads.  
4. **Rollback**: Disable workflow or revert commit; previous Pages deployment may remain until overwritten—acceptable for static docs.

## Open Questions

- Production canonical URL is **`https://ssh-vpn.xinghui.club`** (custom domain at site root; `base` remains `/`). Project-only Pages without this domain remains an edge case for forks.
