// Avisa a los buscadores que usan IndexNow (Bing, Yandex, Seznam, Naver)
// qué páginas cambiaron, leyendo el sitemap publicado.
//
//   node scripts/indexnow.mjs            URLs con lastmod de los últimos 3 días
//   node scripts/indexnow.mjs --days 7   ventana distinta
//   node scripts/indexnow.mjs --all      todas las URLs del sitemap
//   node scripts/indexnow.mjs --dry-run  muestra la lista sin enviarla
//
// La clave es pública por diseño: Bing la valida leyendo public/<clave>.txt.
// Si se cambia, hay que renombrar ese archivo también.

const SITE_URL = "https://agenciakliv.com";
const KEY = "b7557598b9f23d266c8a7e8334f9b071";
const ENDPOINT = "https://api.indexnow.org/indexnow";
// IndexNow acepta hasta 10.000 URLs por pedido.
const BATCH_SIZE = 10000;

const args = process.argv.slice(2);
const all = args.includes("--all");
const dryRun = args.includes("--dry-run");
const daysArg = args.indexOf("--days");
const days = daysArg >= 0 ? Number(args[daysArg + 1]) : 3;

if (!all && !(days > 0)) {
  console.error("--days necesita un número positivo");
  process.exit(1);
}

const keyResponse = await fetch(`${SITE_URL}/${KEY}.txt`);
const publishedKey = (await keyResponse.text()).trim();
if (!keyResponse.ok || publishedKey !== KEY) {
  console.error(`La clave no está publicada en ${SITE_URL}/${KEY}.txt (HTTP ${keyResponse.status}).`);
  process.exit(1);
}

const sitemapResponse = await fetch(`${SITE_URL}/sitemap.xml`);
if (!sitemapResponse.ok) {
  console.error(`No se pudo leer el sitemap (HTTP ${sitemapResponse.status}).`);
  process.exit(1);
}
const sitemap = await sitemapResponse.text();

const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim(),
  lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim(),
}));

// lastmod viene como fecha sin hora (data/contentDates.json), así que se
// compara por día: una página editada hoy entra aunque el deploy sea a la noche.
const since = new Date();
since.setUTCHours(0, 0, 0, 0);
since.setUTCDate(since.getUTCDate() - days);

const urls = entries
  .filter(({ loc, lastmod }) => loc && (all || (lastmod && new Date(lastmod) >= since)))
  .map(({ loc }) => loc);

if (urls.length === 0) {
  console.log(`Ninguna URL cambió en los últimos ${days} días; no hay nada que avisar.`);
  process.exit(0);
}

console.log(`${urls.length} URL${urls.length === 1 ? "" : "s"} para avisar:`);
for (const url of urls) console.log(`  ${url}`);

if (dryRun) process.exit(0);

for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList: urls.slice(i, i + BATCH_SIZE),
    }),
  });

  // 200 = recibido, 202 = recibido y la clave queda pendiente de validar.
  if (response.status !== 200 && response.status !== 202) {
    console.error(`IndexNow respondió HTTP ${response.status}: ${await response.text()}`);
    process.exit(1);
  }
  console.log(`IndexNow respondió HTTP ${response.status}.`);
}
