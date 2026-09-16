export const BLOG_COVERS = {
  "que-es-performance-marketing-guia-completa": "/blog/covers/performance-marketing.png",
  "performance-marketing-ecommerce": "/blog/covers/ecommerce.png",
  "performance-marketing-empresas-de-servicios": "/blog/covers/services.png",
  "performance-marketing-productos-digitales": "/blog/covers/digital-products.png",
  "roas-mer-cac-que-metrica-mirar": "/blog/covers/metrics.png",
};

export function getBlogCover(slug) {
  return BLOG_COVERS[slug] || null;
}
