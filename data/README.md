# Contenido local

- `business.js`: contacto y domicilio confirmados el 18/09/2026. Reutilizados en footer y schema; no se infieren coordenadas, horarios ni zonas de servicio.
- `contentDates.json`: publicación de los 33 artículos en español el 17/09/2026, confirmada por el usuario, y de la versión en inglés el 21/09/2026. Las fechas de artículos (`articles[slug].es|en`) y del índice del blog (`pages.blog.es|en`) van por idioma; `lib/contentDates.js` las lee. Las fechas de edición del resto de las páginas se recuperaron del historial Git de sus archivos de contenido. Actualizar `dateModified`/`pages` solo cuando cambie contenido significativo; nunca usar la fecha automática del build. Si se edita un artículo, actualizar también su fecha visible y el sitemap a través de este archivo.
- `blogArticles.js` (español, original) y `blogArticles.en.js` (inglés). Cada idioma tiene su propio slug (`blogSlugs.en.js` mapea slug español → inglés; el inglés guarda el español en `sourceSlug` como identificador estable para fechas, portadas y hreflang) y comparten orden; el inglés se genera con `node scripts/import-blog-markdown.mjs <export.md> en data/blogArticles.en.js` a partir del Markdown exportado y no se edita a mano. El conversor reproduce el mismo HTML que el español (validado: 31/33 idénticos, 33/33 con el mismo texto visible; las dos diferencias son una clase `num` sin estilos). `lib/blog.js` da acceso por idioma; los componentes cliente usan `lib/contentDates.js` para no arrastrar los artículos al bundle.
- `blogSeo.js`: ajustes de título y descripción para metadatos, por idioma (`es`/`en`). El texto editorial original permanece en `blogArticles*.js`.
- La portada social de cada artículo es `/api/blog-cover/<slug>/` en español y `/api/blog-cover/<slug>/?locale=en` en inglés.
- Para agregar o renombrar un artículo en inglés: añadir el par en `blogSlugs.en.js`, regenerar `blogArticles.en.js` y, si el slug ya estaba publicado, sumar un redirect 308 en `next.config.js`. `LocaleSwitcher` usa el mismo mapa para cambiar de idioma dentro de un artículo.
- Cada artículo cierra con bloques `<div class="faq-item"><div class="q">…</div><p>…</p></div>`. `lib/blogFaq.js` los convierte en el schema `FAQPage` de cada artículo y `BlogArticle` en el acordeón visible (con `id` de fragmento y `<h3>`), así el texto marcado es el mismo que se ve. Mantener ese formato al agregar preguntas; `check:seo` comprueba que coincidan.
- `/es/blog/` y `/en/blog/` publican un `CollectionPage` + `Blog` con los 33 `BlogPosting` y sus fechas. `/llms.txt` (`app/llms.txt/route.js`) reutiliza el mismo copy y `business.js`, y lista el blog en los dos idiomas; no agregar ahí afirmaciones que no estén publicadas en el sitio.
- `blog/page.js`, `blog/[slug]/page.js` y `blog-recomendado/page.js` prerenderizan solo los locales de `BLOG_LOCALES` con `dynamicParams = false`, para que cualquier otro locale responda 404 real (sin eso, el `notFound()` salía con status 200 y `noindex`, un soft 404). Índice y artículos llevan hreflang es/en porque ambos idiomas existen.

## Estado de la auditoría GEO (18/09/2026)

Se implementaron testimonios escritos en HTML inicial, contacto visible y schema de organización/oficina, perfiles sociales, servicios individuales, FAQPage y anchors accesibles, breadcrumbs y fechas del blog, sitemap con biblioteca y lastmod, y metadatos concisos para los 33 artículos.

Los videos testimoniales usan posters extraídos de los originales y `preload="none"` para que las copias del carrusel no descarguen metadatos al montar. La reproducción se limita a las tarjetas visibles y la promesa de reproducción maneja rechazos del navegador.

`videoMetadata.json` registra el 20/07/2025 como fecha de publicación del video principal y los tres testimoniales, confirmada por el usuario. Los cuatro VideoObject se sirven en el JSON-LD inicial de ambas home, con nombres/descripciones localizados, thumbnails reales y contentUrl correspondiente al video español o inglés. La `duration` de cada video se midió con `ffprobe` sobre los archivos de `public/` (21/09/2026). No se inventan horarios, reproducciones ni puntuaciones. Este marcado no garantiza indexación o resultados enriquecidos de video.

Los tres testimonios escritos van como `Review` en el JSON-LD de ambas home (`data/testimonials.js` + `messages/<locale>.json`), con el mismo texto y autor que se ven en la tarjeta. No llevan `reviewRating` ni `AggregateRating`: no hay puntuaciones verificadas, y las reseñas sobre la propia organización no habilitan estrellas de Google. `check:seo` comprueba que cada `reviewBody` coincida con el texto visible y que no exista rating.

`Organization` declara `alternateName: "KLIV Agency"`, la forma con la que se presenta la home en inglés en `title` y Open Graph; el `name` canónico sigue siendo "Agencia KLIV" en los dos idiomas. Los alt de las fotos del equipo se traducen desde `team.memberAlt`/`team.groupAlt`.

Las seis fotos visibles tienen nombre respaldado por `MEMBERS`. El usuario identificó a Genesis Leal en `chica-small.webp`; el mismo alt se usa en móvil y escritorio. El registro anterior de `chica_small.webp` no se reutiliza porque corresponde a otro nombre de archivo.

El redirect directo de www está activo en producción (verificado el 21/09/2026): el dominio www está conectado al entorno Production en Vercel y aplica las reglas de host de `next.config.js`. La home www responde 308 hacia `/es/`; las otras rutas conservan su path (por ejemplo, `www.agenciakliv.com/es/blog/` → `agenciakliv.com/es/blog/`). No configurar todo www hacia `/es/`, porque perdería las URLs de artículos.

- `caseStudies.js`: casos de éxito en español, transcritos del documento "Resultados de clientes reales" (21/09/2026). Rolicred y Saniito con nombre real por autorización del cliente; el resto sin marca. `lib/caseStudies.js` da acceso por idioma y define el slug del índice de cada uno (`/es/casos-de-exito/`, `/en/case-studies/`); cada caso tiene su propia página debajo (`/es/casos-de-exito/<id>/`, `app/[locale]/[resource]/[slug]/page.js`) y el `id` es el mismo en todos los idiomas. El inglés se suma con `caseStudies.en.js` y su entrada en `CONTENT`/`CASE_STUDIES_PATHS`; hasta entonces las rutas en inglés responden 404 y la sección de la home en inglés no se muestra. El índice publica CollectionPage + BreadcrumbList + ItemList + FAQPage y cada caso WebPage + BreadcrumbList, siempre con el mismo texto visible y sin ratings. La home y el índice usan la misma tarjeta (`CaseStudyCard`: rubro, métrica destacada `metric`, nombre y resumen); la sección de la home va entre socios y testimonios. La fecha va en `contentDates.json` bajo `pages["casos-de-exito"][locale]` y vale para el índice y los casos. `foundingDate: 2014` en `Organization` sale del mismo documento ("Desde 2014"). No agregar cifras que no estén en el documento; `check:seo` comprueba cada página, sus resultados visibles y el sitemap.
- `billing.json`: tarifas y servicios recuperados el 7 de septiembre de 2026. Se conservaron los valores originales, incluidos campos vacíos.
- `partners.json`: orden de las imágenes de socios. Los archivos están en `public/partners/`.
- `clientPortals.json`: portales de clientes que siguen siendo un redirect externo. Cada entrada `"Nombre": { "name": "Nombre", "url": "https://..." }` hace que `/cliente/Nombre/` (y en minúsculas) redirija a esa URL. Usar nombres sin espacios ni acentos.
- `portals/<slug>.json`: portales que son páginas reales y protegidas del sitio, servidas en `/cliente/<slug>/` por `app/cliente/[slug]/page.js`. No se listan en el sitemap y llevan `noindex`. Un cliente vive en uno de los dos sistemas, nunca en ambos: si se migra de redirect a página real, hay que sacar su entrada de `clientPortals.json` (si no, el redirect lo intercepta antes de llegar a la página). El registro de slugs válidos está en `lib/portals.js`.

## Agregar un portal protegido

1. Crear `data/portals/<slug>.json` usando el mismo esquema de `isada.json`.
2. Agregar su cargador en `lib/portals.js`.
3. Crear en Vercel la variable `<SLUG>_PORTAL_PASSWORD` con una contraseña fuerte; por ejemplo, `ISADA_PORTAL_PASSWORD`.
4. Definir una sola vez `CLIENT_PORTAL_SESSION_SECRET` con un valor aleatorio largo para firmar las sesiones.

Las contraseñas y el secreto de sesión nunca deben guardarse en GitHub. Para probar localmente, colocarlos en `.env.local`, archivo ignorado por Git.

Para actualizar contenido, editar estos archivos y publicar el proyecto por el flujo habitual de GitHub/Vercel. El panel anterior está retirado y devuelve 404. La web ya no necesita Firebase para leer ni modificar este contenido.
