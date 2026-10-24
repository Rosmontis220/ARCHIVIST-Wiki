// ARCHIVIST Wiki · Decap CMS GitHub OAuth 代理（Cloudflare Worker）
// 环境变量：CLIENT_ID / CLIENT_SECRET（secret），ADMIN_URL（var，默认线上 admin 地址）

function htmlPage(title, body) {
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>${title}</title>` +
      `<style>body{font-family:system-ui,sans-serif;max-width:34rem;margin:4rem auto;padding:0 1rem;line-height:1.6}</style>` +
      `<h1>${title}</h1><p>${body}</p><p><a href="/auth">重新登录</a> · <a href="https://xikmwiki.rosmontis220.top/admin/">返回后台</a></p>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function parseCookie(header) {
  const out = {};
  for (const part of header.split(/;\s*/)) {
    const i = part.indexOf("=");
    if (i > 0) out[part.slice(0, i)] = decodeURIComponent(part.slice(i + 1));
  }
  return out;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      const state = crypto.randomUUID();
      const params = new URLSearchParams({
        client_id: env.CLIENT_ID,
        redirect_uri: `${url.origin}/cb`,
        scope: "repo",
        state,
      });
      return new Response(null, {
        status: 302,
        headers: {
          Location: `https://github.com/login/oauth/authorize?${params}`,
          "Set-Cookie": `decap_state=${state}; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Path=/`,
        },
      });
    }

    if (url.pathname === "/cb") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const cookie = parseCookie(request.headers.get("Cookie") || "");
      if (!code || !state || cookie.decap_state !== state) {
        return htmlPage("登录失败", "无效或过期的登录状态，请重新点击「Login with GitHub」。");
      }
      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/cb`,
        }),
      });
      const data = await tokenRes.json().catch(() => ({}));
      if (data.error) {
        return htmlPage("登录失败", data.error_description || data.error);
      }
      const admin = (env.ADMIN_URL || "https://xikmwiki.rosmontis220.top/admin/").replace(/\/+$/, "");
      const hash = new URLSearchParams({
        access_token: data.access_token,
        provider: "github",
        scope: "repo",
      });
      return new Response(null, { status: 302, headers: { Location: `${admin}/#${hash}` } });
    }

    return new Response("ARCHIVIST Wiki · Decap CMS GitHub OAuth 代理。入口：/auth", { status: 200 });
  },
};
