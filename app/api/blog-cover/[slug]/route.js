import { ImageResponse } from "@vercel/og";
import { getBlogArticle } from "@/lib/blog";
import { withoutDashes } from "@/lib/visibleText";

export const runtime = "edge";

const COPY = {
  es: { blog: "Blog de Performance Marketing", tagline: "Ideas para convertir inversión en crecimiento rentable" },
  en: { blog: "Performance Marketing Blog", tagline: "Ideas to turn ad spend into profitable growth" },
};

// /api/blog-cover/<slug>/ es la portada en español; ?locale=en usa el artículo en inglés.
export async function GET(request, { params }) {
  const locale = new URL(request.url).searchParams.get("locale") || "es";
  const article = getBlogArticle(params.slug, locale);
  const copy = COPY[locale];
  const cover = article && copy && { title: withoutDashes(article.title, locale), category: withoutDashes(article.category, locale) };
  if (!cover) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#ffffff",
          background: "linear-gradient(125deg, #003629 0%, #075b47 58%, #3bb59e 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #8ddcca",
              borderRadius: 14,
              color: "#8ddcca",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>KLIV</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
          <div style={{ display: "flex", color: "#8ddcca", fontSize: 22, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
            {copy.blog} · {cover.category}
          </div>
          <div style={{ fontSize: cover.title.length > 90 ? 48 : cover.title.length > 65 ? 56 : 66, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {cover.title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#d9f3ec", fontSize: 24 }}>
          <span>{copy.tagline}</span>
          <span>agenciakliv.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
