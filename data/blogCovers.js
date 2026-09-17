export const BLOG_COVERS = {
  "que-es-performance-marketing-guia-completa": "/blog/covers/performance-marketing.png",
  "performance-marketing-ecommerce": "/blog/covers/ecommerce.png",
  "performance-marketing-empresas-de-servicios": "/blog/covers/services.png",
  "performance-marketing-productos-digitales": "/blog/covers/digital-products.png",
  "roas-mer-cac-que-metrica-mirar": "/blog/covers/metrics.png",
  "como-bajar-el-cac-sin-frenar-la-adquisicion": "/blog/covers/metrics.png",
  "meta-ads-vs-google-ads-donde-invertir": "/blog/covers/performance-marketing.png",
  "cuanto-invertir-en-publicidad-digital": "/blog/covers/ecommerce.png",
  "leads-baratos-vs-leads-rentables": "/blog/covers/services.png",
  "cuando-contratar-una-agencia-de-performance-marketing": "/blog/covers/performance-marketing.png",
};

export function getBlogCover(slug) {
  return BLOG_COVERS[slug] || null;
}
