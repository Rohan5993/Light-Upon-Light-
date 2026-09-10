const SITE = "https://thelightuponlight.org";
const KEY = "e51bca06a26fa0ba5a19b9b0338c37e9";

const URL_LIST = [
  `${SITE}/`,
  `${SITE}/about`,
  `${SITE}/about/ronahi-zebari`,
  `${SITE}/press`,
  `${SITE}/programs`,
  `${SITE}/donate`,
  `${SITE}/volunteer`,
  `${SITE}/contact`,
  `${SITE}/blog`,
  `${SITE}/sitemap.xml`,
];

async function pingIndexNow() {
  const body = {
    host: "thelightuponlight.org",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: URL_LIST,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow status: ${res.status}`);
}

async function main() {
  try {
    await pingIndexNow();
  } catch (err) {
    console.warn("IndexNow ping failed:", err instanceof Error ? err.message : err);
  }
  console.log("Manual next steps:");
  console.log("1. Google Search Console → add domain thelightuponlight.org → verify DNS TXT");
  console.log("2. Submit sitemap: https://thelightuponlight.org/sitemap.xml");
  console.log("3. URL Inspection → Request indexing for homepage, /about, /programs, /donate, /press");
  console.log("4. Bing Webmaster Tools → Import from GSC or add sitemap");
}

main();
