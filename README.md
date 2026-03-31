# ssh-vpn-wiki

[English](#english) · [中文](#中文)

---

## English

[VitePress](https://vitepress.dev/) site for **ssh-vpn** documentation. Live site: <https://ssh-vpn.xinghui.club> (English at the root; Chinese under `/zh/`).

**Repository:** <https://github.com/xinghui-tech/ssh-vpn-wiki>

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

### Editing docs

The footer “Edit this page” link points to the matching Markdown file on the `main` branch of this repository.

---

## 中文

基于 [VitePress](https://vitepress.dev/) 的 **ssh-vpn** 文档站点。线上地址：<https://ssh-vpn.xinghui.club>（英文为站点根路径，中文为 `/zh/`）。

**源码仓库：** <https://github.com/xinghui-tech/ssh-vpn-wiki>

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

### 编辑文档

页脚「Edit this page」指向本仓库 `main` 分支中对应的 Markdown 文件。
