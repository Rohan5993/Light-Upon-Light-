const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://thelightuponlight.org/</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/about</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/about/ronahi-zebari</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/press</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/programs</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/programs/enlighten</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/programs/big-light-little-light</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/programs/light-desserts</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/programs/signs-of-our-light</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/programs/sending-light-abroad</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/programs/meet-our-light</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/volunteer</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/donate</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/contact</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/contact/appointment</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/i-was-denied-a-cup-of-tea-because-of-my-disability</loc><lastmod>2026-09-03</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/the-only-curse-word-i-grew-up-knowing-wasn-t-a-swear-word</loc><lastmod>2026-09-03</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/should-i-offer-help-to-someone-in-a-wheelchair-the-answer-is-simpler-than-you-think</loc><lastmod>2026-09-03</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/one-conversation-can-change-a-lifetime</loc><lastmod>2026-09-03</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/it-s-not-hate-it-s-something-harder-to-admit</loc><lastmod>2026-09-03</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/for-a-few-hours-i-stopped-wondering-whether-i-belonged</loc><lastmod>2026-09-03</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/how-light-upon-light-started</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/enlighten-program-edmonds-school-district</loc><lastmod>2026-09-11</lastmod></url>
  <url><loc>https://thelightuponlight.org/blog/what-light-upon-light-means-in-washington</loc><lastmod>2026-09-11</lastmod></url>
</urlset>
`;

export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(SITEMAP);
}
