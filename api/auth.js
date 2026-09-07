/**
 * Decap CMS → GitHub OAuth start.
 * Opens GitHub authorize, then returns to /api/callback.
 */
export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("Missing GITHUB_CLIENT_ID on Vercel.");
    return;
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const redirectUri = `${proto}://${host}/api/callback`;

  const scopeParam = req.query.scope;
  const scope = Array.isArray(scopeParam)
    ? scopeParam.join(",")
    : scopeParam || "repo,user";

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);

  res.redirect(302, url.toString());
}
