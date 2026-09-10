import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Run against a production server: node scripts/check-seo.mjs http://127.0.0.1:3100
const base = process.argv[2] || "http://127.0.0.1:3000";
const origin = "https://agenciakliv.com";
let checks = 0;
async function request(path) {
  return fetch(`${base}${path}`, { redirect: "manual" });
}
function tags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "g"))].map(([text]) =>
    Object.fromEntries([...text.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2]]))
  );
}
for (const locale of ["es", "en"]) {
  for (const path of ["", "quiz/", "book-a-call/", "thank-you/"]) {
    const route = `/${locale}/${path}`;
    const response = await request(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const structured = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    if (!path) {
      assert.equal(structured.length, 1, `${route} single server-rendered JSON-LD`);
      const data = JSON.parse(structured[0][1]);
      assert.equal(data["@context"], "https://schema.org");
      const graph = data["@graph"];
      assert.deepEqual(graph.map((node) => node["@type"]), ["Organization", "WebSite", "WebPage", "Service"]);
      const ids = new Set(graph.map((node) => node["@id"]));
      assert.equal(ids.size, 4);
      for (const node of graph) {
        for (const field of ["publisher", "isPartOf", "about", "mainEntity", "provider"]) {
          if (node[field]) assert.ok(ids.has(node[field]["@id"]), `${route} resolved ${field}`);
        }
      }
      const messages = JSON.parse(await readFile(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));
      assert.equal(graph[2].url, origin + route);
      assert.equal(graph[2].inLanguage, locale);
      assert.equal(graph[2].name, messages.metadata.title);
      assert.equal(graph[3].name, messages.services.title);
      assert.equal(graph[3].description, messages.services.subtitle);
      const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
      assert.ok(visibleHtml.includes(messages.services.subtitle), `${route} service copy is in initial HTML`);
      assert.ok(visibleHtml.includes('id="servicios"'));
      assert.equal(graph[0].logo, `${origin}/kliv-isotipo-green.png`);
    } else {
      assert.equal(structured.length, 0, `${route} does not inherit home schema`);
    }
    const links = tags(html, "link");
    const metas = tags(html, "meta");
    assert.equal(tags(html, "html")[0]?.lang, locale, `${route} language`);
    assert.equal(links.find((x) => x.rel === "canonical")?.href, origin + route, `${route} canonical`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route} H1`);
    assert.ok(/<title>[^<]+<\/title>/.test(html), `${route} title`);
    assert.ok(metas.find((x) => x.name === "description")?.content, `${route} description`);
    if (path === "thank-you/") {
      assert.match(metas.find((x) => x.name === "robots")?.content || "", /noindex/);
      assert.equal(links.filter((x) => x.hreflang).length, 0);
    } else {
      assert.equal(metas.find((x) => x.property === "og:url")?.content, origin + route);
      assert.equal(metas.find((x) => x.property === "og:image")?.content, `${origin}/kliv-isotipo-green.png`);
      for (const lang of ["es", "en", "x-default"]) {
        assert.equal(links.find((x) => x.hreflang === lang)?.href, `${origin}/${lang === "x-default" ? "es" : lang}/${path}`);
      }
    }
    checks++;
  }
}
for (const [path, status, destination] of [["/", 307, "/es/"], ["/quiz", 308, "/quiz/"], ["/quiz/", 307, "/es/quiz/"], ["/en/politicas-de-privacidad/", 308, "/es/politicas-de-privacidad/"]]) {
  const response = await request(path);
  assert.equal(response.status, status, path);
  assert.equal(new URL(response.headers.get("location"), base).pathname, destination, path);
  checks++;
}
for (const path of ["/es/panel/", "/en/panel/", "/fr/", "/fr/quiz/", "/es/missing/"]) {
  assert.equal((await request(path)).status, 404, path);
  checks++;
}
const robots = await request("/robots.txt");
assert.equal(robots.status, 200);
const robotsText = await robots.text();
assert.ok(robotsText.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!robotsText.includes("Disallow: /es/thank-you"));
const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(locations.length, 7);
assert.equal(new Set(locations).size, 7);
for (const url of locations) {
  assert.ok(url.startsWith(origin + "/") && url.endsWith("/"));
  assert.ok(!/panel|thank-you|#|\/en\/politicas/.test(url));
  assert.equal((await request(new URL(url).pathname)).status, 200, url);
}
assert.equal((await request("/kliv-isotipo-green.png")).status, 200);
console.log(`SEO OK: ${checks} page/redirect/error checks, robots.txt, 7 sitemap URLs, sharing image and bilingual server-rendered JSON-LD.`);
