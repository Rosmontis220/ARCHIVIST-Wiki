# ARCHIVIST-Wiki

ARG 知识库（档案文明 / Silverfish_0 两大主题），MkDocs Material 构建，部署在 GitHub Pages。

- 站点：<https://xikmwiki.rosmontis220.top/>
- 内容目录：`docs/`（Markdown，条目即文件）
- 主题一：`docs/档案文明/` —— 作品 ABANDON / RETAIN / GROUP / TRADE / REVIEW / Terminal Cataloguing / XYEBBS
- 主题二：`docs/Silverfish_0/`

## 本地预览

```
pip install mkdocs-material
mkdocs serve
```

## 在线编辑（Decap CMS）

访问 <https://xikmwiki.rosmontis220.top/admin/>，用 GitHub 账号登录后可直接编辑/新建条目（走 git 提交记录）。

首次启用需要注册一个 GitHub OAuth App（用于免服务器的 PKCE 登录）：

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Homepage URL 填 `https://xikmwiki.rosmontis220.top/`，Authorization callback URL 填 `https://xikmwiki.rosmontis220.top/admin/`
3. 把得到的 Client ID 填进 `docs/admin/config.yml` 的 `backend.app_id`

## 部署

push 到 main 后 GitHub Actions 自动构建发布（`.github/workflows/deploy.yml`）。

域名：`xikmwiki.rosmontis220.top` 需要一条 DNS CNAME 记录指向 `Rosmontis220.github.io`。
