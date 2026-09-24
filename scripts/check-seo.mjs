import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Run against a production server: node scripts/check-seo.mjs http://127.0.0.1:3100
const base = process.argv[2] || "http://127.0.0.1:3000";
const origin = "https://agenciakliv.com";
const articleSource = await readFile(new URL("../data/blogArticles.js", import.meta.url), "utf8");
const { BLOG_SLUGS: blogSlugs } = await import(`data:text/javascript;base64,${Buffer.from(articleSource).toString("base64")}`);
const slugSource = await readFile(new URL("../data/blogSlugs.en.js", import.meta.url), "utf8");
const { BLOG_SLUGS_EN: englishSlugs } = await import(`data:text/javascript;base64,${Buffer.from(slugSource).toString("base64")}`);
// Slug de cada artículo por idioma, indexado por el slug español.
const articleSlug = (slug, locale) => (locale === "es" ? slug : englishSlugs[slug]);
const contentDates = JSON.parse(await readFile(new URL("../data/contentDates.json", import.meta.url), "utf8"));
let checks = 0;
async function request(path) {
  return fetch(`${base}${path}`, { redirect: "manual" });
}
// Texto visible de un fragmento HTML, con las entidades que React escapa al renderizar.
function text(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/<!-- -->/g, "").replace(/\s+/g, " ").trim();
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
      assert.deepEqual(graph.map((node) => node["@type"]), ["Organization", "WebSite", "WebPage", "Service", "ProfessionalService", "Service", "Service", "Service", "Review", "Review", "Review", "FAQPage", "VideoObject", "VideoObject", "VideoObject", "VideoObject"]);
      const ids = new Set(graph.map((node) => node["@id"]));
      assert.equal(ids.size, graph.length);
      for (const node of graph) {
        for (const field of ["publisher", "isPartOf", "about", "mainEntity", "provider", "itemReviewed"]) {
          if (node[field]?.["@id"]) assert.ok(ids.has(node[field]["@id"]), `${route} resolved ${field}`);
        }
      }
      const messages = JSON.parse(await readFile(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));
      assert.equal(graph[2].url, origin + route);
      assert.equal(graph[2].inLanguage, locale);
      assert.equal(graph[2].name, messages.metadata.title);
      assert.equal(graph[3].name, messages.services.title);
      assert.equal(graph[3].description, messages.services.subtitle);
      const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
      assert.equal(graph[0].sameAs.length, 2);
      assert.equal(graph[0].telephone, "+5493515504011");
      assert.ok(visibleHtml.includes("Rosario de Santa Fe 1106"));
      assert.ok(visibleHtml.includes("+54 9 351 550-4011"));
      for (const key of ["saniito", "solMillan", "rolicred"]) {
        assert.ok(visibleHtml.includes(messages.testimonials[key]), `${route} testimonial ${key} in initial HTML`);
        const review = graph.find((node) => node["@id"] === `${origin}${route}#review-${key.toLowerCase()}`);
        assert.equal(review?.reviewBody, messages.testimonials[key], `${route} review ${key} matches visible text`);
        assert.ok(review.author.name && review.author.worksFor.name, `${route} review ${key} author`);
        assert.ok(visibleHtml.includes(review.author.name), `${route} review ${key} author visible`);
        assert.equal(review.reviewRating, undefined, `${route} review ${key} without invented rating`);
      }
      assert.equal(graph[0].alternateName, "KLIV Agency");
      assert.equal(graph[0].foundingDate, "2014");
      const faq = graph.find((node) => node["@type"] === "FAQPage");
      assert.equal(faq.mainEntity.length, 9);
      for (const question of faq.mainEntity) {
        assert.ok(visibleHtml.includes(`id="${question["@id"].split("#")[1]}"`));
        assert.ok(visibleHtml.includes(question.name));
      }
      assert.ok(!visibleHtml.includes('alt="Team member"'));
      assert.equal(tags(visibleHtml, "img").filter((image) => image.alt === messages.team.memberAlt.replace("{name}", "Genesis Leal")).length, 2, `${route} localized team alt`);
      assert.ok(!tags(visibleHtml, "img").some((image) => locale === "en" && /equipo de/.test(image.alt || "")), `${route} no Spanish alt in English`);
      const videos = graph.filter((node) => node["@type"] === "VideoObject");
      assert.equal(videos.length, 4);
      for (const video of videos) {
        assert.equal(video.uploadDate, "2025-07-20");
        assert.ok(video.name && video.description);
        assert.equal(video.inLanguage, locale);
        const thumbnail = await request(new URL(video.thumbnailUrl).pathname);
        assert.equal(thumbnail.status, 200);
        assert.match(thumbnail.headers.get("content-type") || "", /^image\//);
        const asset = await fetch(`${base}${new URL(video.contentUrl).pathname}`, { headers: { Range: "bytes=0-0" } });
        assert.ok([200, 206].includes(asset.status));
        assert.match(asset.headers.get("content-type") || "", /^video\//);
        await asset.body?.cancel();
        if (locale === "en" && video.contentUrl.endsWith(".mp4")) assert.ok(video.contentUrl.endsWith("-eng.mp4"));
      }
      assert.ok(visibleHtml.includes(messages.services.subtitle), `${route} service copy is in initial HTML`);
      assert.ok(visibleHtml.includes('id="servicios"'));
      const heading = visibleHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || "";
      assert.ok(heading.includes(messages.hero.kicker), `${route} kicker within H1`);
      assert.ok(heading.includes(messages.hero.title), `${route} title within H1`);
      assert.ok(visibleHtml.includes(messages.hero.subtitle), `${route} new hero subtitle`);
      assert.ok(visibleHtml.includes(messages.resources.title), `${route} resources title in initial HTML`);
      const firstBlogItem = locale === "es" ? "performanceMarketing" : "highPerformance";
      assert.ok(visibleHtml.includes(messages.resources.items[firstBlogItem].title), `${route} blog cards in initial HTML`);
      for (const platform of ["Meta Ads", "Google Ads", "TikTok"]) {
        assert.ok(visibleHtml.includes(`>${platform}<`), `${route} platform in HTML text`);
      }
      assert.ok(visibleHtml.includes("© 2026 Agencia KLIV"), `${route} current footer year`);
      assert.ok(!/2025 Agencia Kliv|Kliv LLC</.test(visibleHtml), `${route} old footer removed`);
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
const publishedResource = await request("/es/claves-alto-performance/");
assert.equal(publishedResource.status, 200);
const publishedResourceHtml = await publishedResource.text();
assert.ok(publishedResourceHtml.includes("Diversidad creativa"));
assert.equal(tags(publishedResourceHtml, "link").find((x) => x.rel === "canonical")?.href, `${origin}/es/claves-alto-performance/`);
assert.ok(!/noindex/.test(tags(publishedResourceHtml, "meta").find((x) => x.name === "robots")?.content || ""));
checks++;
// Casos de éxito: índice con slug propio por idioma y una página por caso debajo;
// solo los idiomas publicados, el resto responde 404 real.
const importData = async (file) =>
  import(`data:text/javascript;base64,${Buffer.from(await readFile(new URL(`../data/${file}`, import.meta.url), "utf8")).toString("base64")}`);
// Documento legal: slug propio por idioma y hreflang cruzado entre los dos.
const { LEGAL_PATHS } = await importData("legalSlugs.js");
for (const locale of Object.keys(LEGAL_PATHS)) {
  const route = `/${locale}/${LEGAL_PATHS[locale]}/`;
  const response = await request(route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.equal(tags(html, "html")[0]?.lang, locale, `${route} language`);
  assert.equal(tags(html, "link").find((x) => x.rel === "canonical")?.href, origin + route, `${route} canonical`);
  for (const lang of Object.keys(LEGAL_PATHS)) {
    assert.equal(tags(html, "link").find((x) => x.hreflang === lang)?.href, `${origin}/${lang}/${LEGAL_PATHS[lang]}/`, `${route} hreflang ${lang}`);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route} H1`);
  assert.ok(!/noindex/.test(tags(html, "meta").find((x) => x.name === "robots")?.content || ""), `${route} indexable`);
  checks++;
}
const { CASE_STUDIES_PATHS, CASE_STUDY_SLUGS_EN } = await importData("caseStudySlugs.js");
const { CASE_STUDIES_ES: caseStudiesEs } = await importData("caseStudies.js");
const { CASE_STUDIES_EN: caseStudiesEn } = await importData("caseStudies.en.js");
const caseStudiesContent = { es: caseStudiesEs, en: caseStudiesEn };
// Slug de cada caso por idioma, indexado por su `id` (el slug español).
const caseSlug = (locale, id) => (locale === "en" && CASE_STUDY_SLUGS_EN[id]) || id;
const casePath = (locale, id) => `/${locale}/${CASE_STUDIES_PATHS[locale]}/${caseSlug(locale, id)}/`;
const structuredTypes = (html) =>
  JSON.parse(html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1])["@graph"];
const visible = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
for (const locale of ["es", "en"]) {
  const route = `/${locale}/${CASE_STUDIES_PATHS[locale]}/`;
  const response = await request(route);
  const content = caseStudiesContent[locale];
  if (!content) {
    assert.equal(response.status, 404, `${route} without content is a real 404`);
    assert.equal((await request(`${route}rolicred/`)).status, 404, `${route}rolicred/ without content is a real 404`);
    continue;
  }
  assert.equal(response.status, 200, route);
  const html = await response.text();
  const visibleHtml = visible(html);
  assert.equal(tags(html, "html")[0]?.lang, locale, `${route} language`);
  assert.equal(tags(html, "link").find((x) => x.rel === "canonical")?.href, origin + route, `${route} canonical`);
  assert.ok(!/noindex/.test(tags(html, "meta").find((x) => x.name === "robots")?.content || ""), `${route} indexable`);
  for (const lang of Object.keys(caseStudiesContent)) {
    assert.equal(tags(html, "link").find((x) => x.hreflang === lang)?.href, `${origin}/${lang}/${CASE_STUDIES_PATHS[lang]}/`, `${route} hreflang ${lang}`);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route} H1`);
  const graph = structuredTypes(html);
  assert.deepEqual(graph.map((node) => node["@type"]), ["CollectionPage", "BreadcrumbList", "ItemList"]);
  assert.equal(graph[0].dateModified, contentDates.pages["casos-de-exito"][locale], `${route} content date`);
  assert.equal(graph[2].itemListElement.length, content.cases.length);
  assert.ok(text(visibleHtml).includes(content.title) && text(visibleHtml).includes(content.intro), `${route} heading visible`);
  assert.ok(!/id="(trayectoria|faq)"/.test(visibleHtml), `${route} without trajectory or faq blocks`);
  assert.ok(!/[—–]/.test(text(visibleHtml)), `${route} no long dashes in visible copy`);
  // La home no despliega los casos: solo enlaza al índice desde la trayectoria.
  const home = await (await request(`/${locale}/`)).text();
  assert.ok(!home.includes('id="casos-de-exito"'), `/${locale}/ does not display the case studies section`);
  assert.ok(home.includes(`href="${route}"`), `/${locale}/ links the case studies index`);
  checks++;
  for (const item of content.cases) {
    const caseRoute = casePath(locale, item.id);
    assert.ok(visibleHtml.includes(`href="${caseRoute}"`), `${route} links case ${item.id}`);
    const caseResponse = await request(caseRoute);
    assert.equal(caseResponse.status, 200, caseRoute);
    const caseHtml = await caseResponse.text();
    const caseVisible = text(visible(caseHtml));
    assert.equal(tags(caseHtml, "html")[0]?.lang, locale, `${caseRoute} language`);
    assert.equal(tags(caseHtml, "link").find((x) => x.rel === "canonical")?.href, origin + caseRoute, `${caseRoute} canonical`);
    for (const lang of Object.keys(caseStudiesContent)) {
      assert.equal(tags(caseHtml, "link").find((x) => x.hreflang === lang)?.href, origin + casePath(lang, item.id), `${caseRoute} hreflang ${lang}`);
    }
    // El slug de otro idioma no se sirve bajo este índice.
    if (caseSlug(locale, item.id) !== item.id) assert.equal((await request(`${route}${item.id}/`)).status, 404, `${route}${item.id}/ is a real 404`);
    assert.equal((caseHtml.match(/<h1\b/g) || []).length, 1, `${caseRoute} H1`);
    assert.ok(caseVisible.includes(item.name) && caseVisible.includes(item.challenge), `${caseRoute} content visible`);
    for (const row of item.results) assert.ok(caseVisible.includes(row.after), `${caseRoute} result "${row.after}"`);
    const caseGraph = structuredTypes(caseHtml);
    assert.deepEqual(caseGraph.map((node) => node["@type"]), ["WebPage", "BreadcrumbList"]);
    assert.equal(caseGraph[1].itemListElement.length, 3, `${caseRoute} breadcrumb`);
    assert.ok(!/[—–]/.test(caseVisible), `${caseRoute} no long dashes in visible copy`);
    const description = text(tags(caseHtml, "meta").find((x) => x.name === "description")?.content || "");
    assert.ok(description.length >= 80 && description.length <= 160, `${caseRoute} description (${description.length})`);
    checks++;
  }
  assert.equal((await request(`${route}no-existe/`)).status, 404, `${route}no-existe/ is a real 404`);
}
for (const path of ["/es/case-studies/", "/en/casos-de-exito/", "/en/casos-de-exito/rolicred/"]) {
  assert.equal((await request(path)).status, 404, `${path} cross-language slug is a real 404`);
}
const BLOG_LOCALES = ["es", "en"];
const hreflangs = (links, path) => {
  const paths = typeof path === "string" ? { es: path, en: path } : path;
  for (const lang of ["es", "en", "x-default"]) {
    const target = lang === "x-default" ? "es" : lang;
    assert.equal(links.find((x) => x.hreflang === lang)?.href, `${origin}/${target}/${paths[target]}`, `${paths.es} hreflang ${lang}`);
  }
};
for (const locale of BLOG_LOCALES) {
  const library = await request(`/${locale}/blog/`);
  assert.equal(library.status, 200, `/${locale}/blog/`);
  const libraryHtml = await library.text();
  assert.equal(tags(libraryHtml, "html")[0]?.lang, locale);
  assert.equal(tags(libraryHtml, "link").find((link) => link.rel === "canonical")?.href, `${origin}/${locale}/blog/`);
  hreflangs(tags(libraryHtml, "link"), "blog/");
  const libraryData = JSON.parse(libraryHtml.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(libraryData["@graph"].map((node) => node["@type"]), ["CollectionPage", "Blog"]);
  assert.equal(libraryData["@graph"][1].inLanguage, locale);
  assert.equal(libraryData["@graph"][1].blogPost.length, blogSlugs.length, `${locale} blog index lists every article`);
  checks++;
  for (const key of blogSlugs) {
    const slug = articleSlug(key, locale);
    assert.ok(slug, `${locale} slug for ${key}`);
    const route = `/${locale}/blog/${slug}/`;
    const response = await request(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const links = tags(html, "link");
    const metas = tags(html, "meta");
    // Longitudes sobre el texto real: React serializa el apóstrofo como &#x27;.
    const pageTitle = text(html.match(/<title>([^<]+)<\/title>/)?.[1] || "");
    const description = text(metas.find((x) => x.name === "description")?.content || "");
    const coverPath = `/api/blog-cover/${slug}/${locale === "es" ? "" : `?locale=${locale}`}`;
    const cover = origin + coverPath;
    assert.equal(tags(html, "html")[0]?.lang, locale, `${route} language`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route} H1`);
    assert.equal(links.find((x) => x.rel === "canonical")?.href, origin + route, `${route} canonical`);
    hreflangs(links, { es: `blog/${key}/`, en: `blog/${articleSlug(key, "en")}/` });
    assert.ok(pageTitle.length > 20 && pageTitle.length <= 65, `${route} concise title (${pageTitle.length})`);
    assert.ok(description.length >= 100 && description.length <= 160, `${route} useful description (${description.length})`);
    assert.equal(metas.find((x) => x.property === "og:type")?.content, "article", `${route} Open Graph article`);
    assert.equal(metas.find((x) => x.property === "og:url")?.content, origin + route, `${route} Open Graph URL`);
    assert.equal(metas.find((x) => x.property === "og:image")?.content, cover, `${route} dedicated social image`);
    assert.equal(metas.find((x) => x.property === "og:locale")?.content, locale === "en" ? "en_US" : "es_ES", `${route} Open Graph locale`);
    assert.equal(metas.find((x) => x.name === "twitter:card")?.content, "summary_large_image", `${route} Twitter card`);
    const structured = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.equal(structured.length, 3, `${route} BlogPosting, breadcrumbs and FAQPage JSON-LD`);
    const data = JSON.parse(structured[0][1]);
    assert.equal(data["@type"], "BlogPosting");
    assert.equal(data.inLanguage, locale);
    assert.equal(data.image, cover);
    assert.equal(data.url, origin + route);
    assert.equal(data.mainEntityOfPage["@id"], origin + route);
    assert.equal(data.datePublished, contentDates.articles[key][locale].datePublished);
    assert.equal(data.dateModified, contentDates.articles[key][locale].dateModified);
    assert.ok(tags(html, "time").some((tag) => tag.datetime === data.datePublished));
    const breadcrumbs = JSON.parse(structured[1][1]);
    assert.equal(breadcrumbs["@type"], "BreadcrumbList");
    assert.equal(breadcrumbs.itemListElement[1].item, `${origin}/${locale}/blog/`);
    assert.equal(breadcrumbs.itemListElement[2].item, origin + route);
    // Cada pregunta del schema debe existir, con el mismo texto, en el acordeón visible.
    const faq = JSON.parse(structured[2][1]);
    assert.equal(faq["@type"], "FAQPage");
    const visibleFaqs = [...html.matchAll(/<details class="faq-item" id="([^"]+)"><summary><h3>([\s\S]*?)<\/h3><\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
      .map(([, id, question, answer]) => ({ id, question: text(question), answer: text(answer) }));
    assert.ok(faq.mainEntity.length > 0 && faq.mainEntity.length === visibleFaqs.length, `${route} FAQ count`);
    faq.mainEntity.forEach((entry, index) => {
      assert.equal(entry["@id"], `${origin}${route}#${visibleFaqs[index].id}`, `${route} FAQ anchor`);
      assert.equal(entry.name, visibleFaqs[index].question, `${route} FAQ question matches visible text`);
      assert.equal(entry.acceptedAnswer.text, visibleFaqs[index].answer, `${route} FAQ answer matches visible text`);
    });
    // Los enlaces internos del artículo tienen que quedarse en su idioma. El
    // único cruce permitido es el selector de idioma (lleva hrefLang).
    const htmlWithoutSwitcher = html.replace(/<a\b[^>]*\bhrefLang="[^"]*"[^>]*>[\s\S]*?<\/a>/g, "");
    assert.ok(!new RegExp(`href="/${locale === "es" ? "en" : "es"}/`).test(htmlWithoutSwitcher), `${route} links stay in ${locale}`);
    const switcher = tags(html, "a").find((x) => x.hreflang && x.hreflang !== locale);
    assert.equal(switcher?.href, `/${switcher?.hreflang}/blog/${articleSlug(key, switcher?.hreflang)}/`, `${route} language switcher points to the translated article`);
    assert.ok(!/noindex/.test(metas.find((x) => x.name === "robots")?.content || ""), `${route} indexable`);
    const coverResponse = await request(coverPath);
    assert.equal(coverResponse.status, 200, `${route} social image`);
    assert.match(coverResponse.headers.get("content-type") || "", /^image\/png/, `${route} PNG social image`);
    checks++;
  }
}
// Los slugs no se cruzan entre idiomas: el español no existe bajo /en/ ni al revés.
for (const path of ["/fr/blog/", "/fr/blog/que-es-performance-marketing-guia-completa/", "/en/blog/no-existe/", "/fr/blog-recomendado/", "/en/blog/que-es-performance-marketing-guia-completa/", "/es/blog/what-is-performance-marketing/"]) {
  assert.equal((await request(path)).status, 404, `${path} real 404, not soft 404`);
  checks++;
}
const llms = await request("/llms.txt");
assert.equal(llms.status, 200);
assert.match(llms.headers.get("content-type") || "", /^text\/plain/);
const llmsText = await llms.text();
assert.ok(llmsText.startsWith("# Agencia KLIV"));
for (const locale of BLOG_LOCALES) for (const key of blogSlugs) assert.ok(llmsText.includes(`${origin}/${locale}/blog/${articleSlug(key, locale)}/`), `llms.txt lists ${locale} ${key}`);
checks++;
for (const path of ["/es/marcas-con-alma/", "/en/claves-alto-performance/"]) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  assert.match(tags(await response.text(), "meta").find((x) => x.name === "robots")?.content || "", /noindex/);
  checks++;
}
for (const [path, status, destination] of [["/", 307, "/es/"], ["/quiz", 308, "/quiz/"], ["/quiz/", 307, "/es/quiz/"], ["/en/politicas-de-privacidad/", 308, "/en/privacy-policy/"], ["/es/privacy-policy/", 308, "/es/politicas-de-privacidad/"]]) {
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
const caseStudyUrls = Object.entries(caseStudiesContent).reduce((total, [, content]) => total + 1 + content.cases.length, 0);
assert.equal(locations.length, 9 + caseStudyUrls + BLOG_LOCALES.length * (1 + blogSlugs.length));
for (const [locale, content] of Object.entries(caseStudiesContent)) {
  assert.ok(locations.includes(`${origin}/${locale}/${CASE_STUDIES_PATHS[locale]}/`), `sitemap ${locale} case studies`);
  for (const item of content.cases) assert.ok(locations.includes(origin + casePath(locale, item.id)), `sitemap ${locale} case ${item.id}`);
}
assert.ok(!locations.some((url) => url.includes("/en/casos-de-exito/") || url.includes("/es/case-studies/")), "sitemap has no cross-language case studies slug");
assert.equal(new Set(locations).size, locations.length);
assert.equal((xml.match(/<lastmod>/g) || []).length, locations.length);
assert.ok(locations.includes(`${origin}/es/claves-alto-performance/`));
for (const locale of BLOG_LOCALES) {
  assert.ok(locations.includes(`${origin}/${locale}/blog/`));
  for (const key of blogSlugs) assert.ok(locations.includes(`${origin}/${locale}/blog/${articleSlug(key, locale)}/`), `sitemap ${locale} ${key}`);
}
for (const url of locations) {
  assert.ok(url.startsWith(origin + "/") && url.endsWith("/"));
  assert.ok(!/panel|thank-you|#|\/en\/politicas|\/es\/privacy-policy/.test(url));
  assert.equal((await request(new URL(url).pathname)).status, 200, url);
}
assert.equal((await request("/kliv-isotipo-green.png")).status, 200);
console.log(`SEO OK: ${checks} page/redirect/error checks, robots.txt, ${locations.length} sitemap URLs with lastmod, ${blogSlugs.length} articles in ${BLOG_LOCALES.length} languages, testimonials and bilingual server-rendered JSON-LD.`);
