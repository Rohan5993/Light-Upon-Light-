/**
 * GitHub OAuth callback for Decap CMS.
 * Exchanges code for token (needs client secret server-side), then
 * postMessages the token back to the Decap login popup opener.
 */
export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    res
      .status(500)
      .send("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET on Vercel.");
    return;
  }

  const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code;
  if (!code) {
    res.status(400).send("Missing OAuth code.");
    return;
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error || !data.access_token) {
      const errPayload = JSON.stringify({
        error: data.error || "token_exchange_failed",
        errorDescription: data.error_description || "No access token returned",
      });
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(401).send(callbackPage("error", errPayload));
      return;
    }

    const successPayload = JSON.stringify({
      token: data.access_token,
      provider: "github",
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(callbackPage("success", successPayload));
  } catch (err) {
    const errPayload = JSON.stringify({
      error: "token_exchange_failed",
      errorDescription: err instanceof Error ? err.message : "Unknown error",
    });
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(500).send(callbackPage("error", errPayload));
  }
}

function callbackPage(status, payloadJson) {
  // payloadJson is already a JSON string; embed it into the Decap handshake message.
  return `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Logging in…</title></head>
  <body>
    <p>Completing login… you can close this window.</p>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            "authorization:github:${status}:" + ${JSON.stringify(payloadJson)},
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;
}
