// Convierte el export en Markdown de los artículos del blog al mismo HTML que
// usa data/blogArticles.js (callouts, tablas, FAQ, enlaces recomendados, CTA).
//
//   node scripts/import-blog-markdown.mjs <archivo.md> <locale> [salida.js]
//
// Sin salida, imprime el JSON por stdout (útil para comparar contra el español
// ya publicado). La taxonomía (categoría, tipo de artículo, artifactId) se toma
// del artículo español con el mismo slug, porque el Markdown no la trae.
import { readFile, writeFile } from "node:fs/promises";

const [, , input, locale = "en", output] = process.argv;
if (!input) {
  console.error("Uso: node scripts/import-blog-markdown.mjs <archivo.md> <locale> [salida.js]");
  process.exit(1);
}

const TAXONOMY = {
  en: {
    category: {
      Fundamentos: "Fundamentals",
      "E-commerce": "E-commerce",
      "Empresas de servicios": "Service businesses",
      "Productos digitales": "Digital products",
      Métricas: "Metrics",
    },
    articleType: {
      "Pilar transversal": "Cross-industry pillar",
      "Pilar metodológico": "Methodology pillar",
      "Pilar de vertical": "Vertical pillar",
      "Pilar de referencia": "Reference pillar",
      Soporte: "Supporting",
      BOFU: "BOFU",
    },
    metadata: {
      seoTitle: "SEO Title",
      description: "Meta description",
      keyword: "Primary keyword",
      secondaryKeywords: "Secondary keywords",
      entities: "Relevant entities",
      schema: "Recommended schema",
      funnel: "Funnel",
      niche: "Niche",
    },
    mistakesHeading: /mistake|warning|red flag/i,
    mistakeLabel: /^(common )?mistake/i,
  },
  es: {
    category: {},
    articleType: {},
    metadata: {
      seoTitle: "Title SEO",
      description: "Meta description",
      keyword: "Keyword principal",
      secondaryKeywords: "Keywords secundarias",
      entities: "Entidades relevantes",
      schema: "Schema recomendado",
      funnel: "Funnel",
      niche: "Nicho",
    },
    mistakesHeading: /errores|alerta|red flag/i,
    mistakeLabel: /^error/i,
  },
}[locale];

const spanishSource = await readFile(new URL("../data/blogArticles.js", import.meta.url), "utf8");
const { BLOG_ARTICLES: spanish } = await import(`data:text/javascript;base64,${Buffer.from(spanishSource).toString("base64")}`);
const spanishBySlug = new Map(spanish.map((article) => [article.slug, article]));

// Cada idioma tiene su propio slug; el español es el identificador estable.
const slugSource = await readFile(new URL("../data/blogSlugs.en.js", import.meta.url), "utf8");
const { BLOG_SLUGS_EN: slugsEn } = await import(`data:text/javascript;base64,${Buffer.from(slugSource).toString("base64")}`);
// El export enlaza dos artículos por un slug provisional que nunca se publicó.
const SLUG_ALIASES = {
  "marca-solo-vende-con-promociones": "por-que-tu-marca-solo-vende-con-promociones",
  "optimizar-seguimiento-de-leads-para-vender-mas": "seguimiento-de-leads-para-aumentar-conversion",
};
const localizedSlug = (rawSlug) => {
  const spanishSlug = SLUG_ALIASES[rawSlug] || rawSlug;
  if (locale === "es") return spanishSlug;
  const slug = slugsEn[spanishSlug];
  if (!slug) throw new Error(`Sin slug en ${locale} para ${spanishSlug}`);
  return slug;
};

const escape = (text) => text.replace(/&(?![a-z]+;|#\d+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Enlaces: los internos del blog quedan relativos al artículo (funcionan en
// /es/ y /en/); los que apuntan al sitio en español siguen al locale actual.
function href(url) {
  const blog = url.match(/^\/blog\/([^/?#]+)\/?(#.*)?$/);
  if (blog) return `../${localizedSlug(blog[1])}/${blog[2] || ""}`;
  return url.replace(/^(https:\/\/agenciakliv\.com)?\/es\//, `$1/${locale}/`);
}

function inline(text) {
  const parts = [];
  const stash = (html) => `\u0000${parts.push(html) - 1}\u0000`;
  let out = escape(text)
    .replace(/`([^`]+)`/g, (_m, code) => stash(`<span class="mono">${code}</span>`))
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) => stash(`<a href="${href(url)}">${inline(label)}</a>`));
  out = out
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*\w])\*([^*\n]+)\*(?![*\w])/g, "$1<i>$2</i>");
  return out.replace(/\u0000(\d+)\u0000/g, (_m, index) => parts[index]);
}

const isBoldLead = (line) => /^\*\*[^*]+\*\*/.test(line);
const isWholeBold = (line) => /^\*\*[^*]+\*\*$/.test(line);

function callout(lines, previousHeading) {
  if (lines.length === 1 && isWholeBold(lines[0])) {
    return `<div class="callout"><b class="mono">${inline(lines[0].slice(2, -2))}</b></div>`;
  }
  if (lines.length === 1) {
    const label = lines[0].match(/^\*\*([^*]+)\*\*/)?.[1] || "";
    const warn = TAXONOMY.mistakeLabel.test(label) ? " warn" : "";
    return `<div class="callout${warn}">${inline(lines[0])}</div>`;
  }
  if (lines.every(isBoldLead)) {
    const warn = TAXONOMY.mistakesHeading.test(previousHeading) ? " warn" : "";
    return `<div class="callout${warn}">\n${lines.map((line) => `          <p>${inline(line)}</p>`).join("\n")}\n        </div>`;
  }
  return `<div class="callout">${lines.map(inline).join("<br>\n        ")}</div>`;
}

function table(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*-{2,}/.test(line))
    .map((line) => line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
  const cell = (tag, value) => {
    const mono = /^`[^`]+`$/.test(value);
    const content = mono ? inline(value.slice(1, -1)) : inline(value);
    return `<${tag}${mono ? ' class="mono"' : ""}>${content}</${tag}>`;
  };
  const [head, ...body] = rows;
  return [
    '<div class="table-wrap">',
    "        <table>",
    `          <thead><tr>${head.map((value) => cell("th", value)).join("")}</tr></thead>`,
    "          <tbody>",
    ...body.map((row) => `            <tr>${row.map((value) => cell("td", value)).join("")}</tr>`),
    "          </tbody>",
    "        </table>",
    "        </div>",
  ].join("\n");
}

function recommendedLink(line) {
  const match = line.match(/^- "([^"]+)" → (\S+)(.*)$/);
  if (!match) return `<li>${inline(line.slice(2))}</li>`;
  const [, anchor, rawTarget, rest] = match;
  const target = rawTarget.replace(/^\/blog\/([^/?#]+)\/?$/, (_m, slug) => `/blog/${localizedSlug(slug)}`);
  const tail = rest.replace(/(\/\S+?)(?=[\s)]|$)/g, '<span class="target">$1</span>');
  return `<li><span class="anchor">"${escape(anchor)}"</span> → <span class="target">${escape(target)}</span>${escape(tail).replace(/&lt;(\/?span[^&]*)&gt;/g, "<$1>")}</li>`;
}

function convertBody(lines) {
  const blocks = [];
  let heading = "";
  let section = "";
  let i = 0;
  const push = (html) => blocks.push(html);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("## ")) {
      heading = line.slice(3).trim();
      section = heading;
      push(`\n        <h2>${inline(heading)}</h2>`);
      i++; continue;
    }
    if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      const numbered = title.match(/^(\d+)\.\s+(.*)$/);
      push(`<h5><span class="htag">${numbered ? numbered[1] : "·"}</span>${inline(numbered ? numbered[2] : title)}</h5>`);
      i++; continue;
    }
    if (line.startsWith("> ")) {
      const group = [];
      while (i < lines.length && lines[i].startsWith("> ")) group.push(lines[i++].slice(2).trim());
      push(callout(group, heading));
      continue;
    }
    if (line.startsWith("|")) {
      const group = [];
      while (i < lines.length && lines[i].startsWith("|")) group.push(lines[i++]);
      push(table(group));
      continue;
    }
    if (/^\*\*Q:/.test(line)) {
      const question = line.replace(/^\*\*Q:\s*/, "").replace(/\*\*$/, "").trim();
      i++;
      while (i < lines.length && !lines[i].trim()) i++;
      const answer = lines[i++].replace(/^A:\s*/, "").trim();
      push(`<div class="faq-item"><div class="q">${inline(question)}</div><p>${inline(answer)}</p></div>`);
      continue;
    }
    if (/^- /.test(line)) {
      const group = [];
      while (i < lines.length && /^- /.test(lines[i])) group.push(lines[i++]);
      if (/recomendados|recommended/i.test(section)) {
        push(`<ul class="link-list">\n${group.map((item) => `          ${recommendedLink(item)}`).join("\n")}\n        </ul>`);
      } else {
        push(`<ul>\n${group.map((item) => `          <li>${inline(item.slice(2))}</li>`).join("\n")}\n        </ul>`);
      }
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const group = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) group.push(lines[i++].replace(/^\d+\.\s+/, ""));
      push(`<ol>\n${group.map((item) => `          <li>${inline(item)}</li>`).join("\n")}\n        </ol>`);
      continue;
    }
    // Párrafo: líneas consecutivas hasta un blanco.
    const group = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |> |\||- |\d+\. |\*\*Q:)/.test(lines[i])) group.push(lines[i++].trim());
    const paragraph = group.join(" ");
    const isCta = /conclusi/i.test(section) && /agenciakliv\.com\/es\/quiz\//.test(paragraph) && isBoldLead(paragraph);
    push(isCta ? `\n        <div class="cta-box"><p>${inline(paragraph)}</p></div>` : `<p>${inline(paragraph)}</p>`);
  }
  return blocks.join("\n        ").replace(/^\s+/, "");
}

function parseArticle(chunk, index) {
  const lines = chunk.split("\n");
  const title = lines[0].replace(/^# (Article|Artículo) \d+:\s*/, "").trim();
  const metadata = {};
  for (const line of lines) {
    const match = line.match(/^- \*\*([^:*]+):\*\*\s*(.*)$/);
    if (match) metadata[match[1]] = match[2].trim();
  }
  const sourceSlug = metadata.Slug.replace(/^\/blog\//, "").replace(/\/$/, "");
  const source = spanishBySlug.get(sourceSlug);
  if (!source) throw new Error(`Sin artículo español para ${sourceSlug}`);
  const slug = localizedSlug(sourceSlug);
  const bodyStart = lines.findIndex((line, at) => at > 0 && line.startsWith("# "));
  const content = convertBody(lines.slice(bodyStart + 1));
  const excerpt = content.match(/<p>([\s\S]*?)<\/p>/)[1].replace(/<[^>]*>/g, "");
  const field = (key) => metadata[TAXONOMY.metadata[key]];
  const articleType = TAXONOMY.articleType[source.articleType] || source.articleType;
  const niche = field("niche");
  return {
    artifactId: source.artifactId,
    articleNumber: String(index + 1).padStart(2, "0"),
    slug,
    ...(slug !== sourceSlug && { sourceSlug }),
    title,
    seoTitle: field("seoTitle"),
    description: field("description"),
    category: TAXONOMY.category[source.category] || source.category,
    tags: [articleType, field("funnel"), niche],
    excerpt,
    articleType,
    funnel: field("funnel"),
    niche,
    keyword: field("keyword"),
    secondaryKeywords: field("secondaryKeywords"),
    entities: field("entities"),
    schema: field("schema"),
    content,
  };
}

const markdown = await readFile(input, "utf8");
const chunks = markdown.split(/^(?=# (?:Article|Artículo) \d+:)/m).slice(1);
const articles = chunks.map((chunk, index) => parseArticle(chunk.replace(/\n---\s*$/, "").trimEnd(), index));
if (articles.length !== spanish.length) throw new Error(`Se esperaban ${spanish.length} artículos y hay ${articles.length}`);

if (output) {
  const constant = `BLOG_ARTICLES_${locale.toUpperCase()}`;
  const header = `// Generado por scripts/import-blog-markdown.mjs a partir del export en Markdown.\n// Editar el Markdown y regenerar; no editar este archivo a mano.\n`;
  await writeFile(output, `${header}export const ${constant} = ${JSON.stringify(articles, null, 2)};\n`);
  console.log(`${articles.length} artículos escritos en ${output}`);
} else {
  process.stdout.write(JSON.stringify(articles, null, 2));
}
