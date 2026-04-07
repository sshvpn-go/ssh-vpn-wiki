# EasyConnect SSH Docs

[English](#english) · [中文](#中文)

---

## English

[VitePress](https://vitepress.dev/) site for **EasyConnect SSH** documentation. Product naming: **EasyConnect SSH** (English), **易连助手** (Chinese), code name **`ssh-vpn`**. Live site: <https://ssh-vpn.xinghui.club> (English at the root; Chinese under `/zh/`).

**Repository:** <https://github.com/sshvpn-go/ssh-vpn-wiki>

### Layout

- `src/` — Pages and assets (`index.md`, `download.md`, `pricing.md`, `about.md`, plus `guide/` and mirrored content under `zh/`)
- `src/.vitepress/` — Theme and config (`config.mts`, `theme/`)
- `openspec/` — OpenSpec specs and change records for this repo

### Local development

Requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (pnpm 10 per this repo).

```bash
pnpm install
pnpm dev
```

Use the port printed in the terminal.

### Build and preview

```bash
pnpm build
pnpm preview
```

Output directory: `src/.vitepress/dist/`.

### Deploy to GitHub Pages

Pushes to `main` run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) (build with pnpm, upload `src/.vitepress/dist`, deploy via GitHub Pages).

**One-time (repository admin):** GitHub → **Settings** → **Pages** → **Build and deployment** → set **Source** to **GitHub Actions** (not “Deploy from a branch”). If you use a [custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site), configure **DNS** and the **Custom domain** field on the same Pages settings screen.

### Editing docs

The footer “Edit this page” link points to the matching Markdown file on the `main` branch of this repository.

---

## 中文

基于 [VitePress](https://vitepress.dev/) 的 **EasyConnect SSH / 易连助手** 文档站点，项目代码名为 **`ssh-vpn`**。线上地址：<https://ssh-vpn.xinghui.club>（英文为站点根路径，中文为 `/zh/`）。

**源码仓库：** <https://github.com/sshvpn-go/ssh-vpn-wiki>

### 内容结构

- `src/`：页面与资源（`index.md`、`download.md`、`pricing.md`、`about.md` 及 `guide/`、`zh/` 下的对应内容）
- `src/.vitepress/`：主题与配置（`config.mts`、`theme/`）
- `openspec/`：OpenSpec 规格与变更记录

### 本地开发

需要 [Node.js](https://nodejs.org/) 与 [pnpm](https://pnpm.io/)（仓库使用 pnpm 10）。

```bash
pnpm install
pnpm dev
```

启动后端口以终端输出为准。

### 构建与预览

```bash
pnpm build
pnpm preview
```

构建输出目录：`src/.vitepress/dist/`。

### 发布到 GitHub Pages

向 `main` 推送会触发 [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)（pnpm 构建、上传 `src/.vitepress/dist`、由 GitHub Pages 发布）。

**一次性设置（需仓库管理员）：** GitHub → **Settings** → **Pages** → **Build and deployment** → **Source** 选 **GitHub Actions**（不要选 “Deploy from a branch”）。若使用[自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)，请在同一 Pages 页配置 **DNS** 与 **Custom domain**。

### 编辑文档

页脚「Edit this page」指向本仓库 `main` 分支中对应的 Markdown 文件。
