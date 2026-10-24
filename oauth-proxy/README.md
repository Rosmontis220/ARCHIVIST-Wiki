# Decap CMS GitHub OAuth 代理

Decap CMS 的 GitHub 后端无法在浏览器里直接完成 GitHub 授权（client_secret 不能暴露、token 端点无 CORS），官方的 `auth_type: pkce` 只对 GitLab/Gitea/Forgejo 有效。这里用 Cloudflare Worker 做一个最小的授权码换 token 代理，登录流程即恢复。

## 部署步骤

### 1. GitHub OAuth App

GitHub → Settings → Developer settings → OAuth Apps → New OAuth App（或编辑现有 App）：

- **Homepage URL**：`https://xikmwiki.rosmontis220.top/`
- **Authorization callback URL**：`https://<worker 域名>/cb`（第 2 步部署后得到，例如 `https://archivist-decap-oauth.<你的子域>.workers.dev/cb`；自定义域名也可以）

记下 **Client ID** 和 **Client Secret**（Client Secret 只显示一次）。

### 2. 部署 Worker

**方式 A（推荐，CLI）**：本目录下执行

```bash
npx wrangler login
npx wrangler deploy
npx wrangler secret put CLIENT_ID      # 粘贴 Client ID
npx wrangler secret put CLIENT_SECRET  # 粘贴 Client Secret
```

**方式 B（网页）**：Cloudflare Dashboard → Workers & Pages → Create → 粘贴 `worker.js` 内容 → Settings → Variables 中添加 `CLIENT_ID`、`CLIENT_SECRET`（加密）和 `ADMIN_URL = https://xikmwiki.rosmontis220.top/admin/`。

### 3. 回填 OAuth App

把第 2 步得到的 Worker 域名填回第 1 步的 Authorization callback URL（如果第 1 步先建了 App，此时补上）。

### 4. 更新 wiki 的 CMS 配置

`docs/admin/config.yml` 的 backend 改为：

```yaml
backend:
  name: github
  repo: Rosmontis220/ARCHIVIST-Wiki
  branch: main
  base_url: https://<worker 域名>
  auth_endpoint: /auth
```

（删掉 `auth_type` 与 `app_id`。）提交推送后，`/admin/` 点「Login with GitHub」即走：Worker `/auth` → GitHub 授权 → Worker `/cb` 换 token → 跳回 `/admin/#access_token=...`。

## 说明

- Worker 只做授权码交换，不落库、不转发其他请求；state 用 HttpOnly Cookie 校验。
- token 通过 URL hash 传给前端（Decap 的标准流程），scope 仅 `repo`。
- 不用时删除 Worker 即可，对站点本身无影响。
