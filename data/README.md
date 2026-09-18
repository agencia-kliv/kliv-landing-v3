# Contenido local

- `business.js`: contacto y domicilio confirmados el 18/09/2026. Reutilizados en footer y schema; no se infieren coordenadas, horarios ni zonas de servicio.
- `contentDates.json`: publicación de los 33 artículos el 17/09/2026, confirmada por el usuario. Las fechas de edición del resto de las páginas se recuperaron del historial Git de sus archivos de contenido. Actualizar `dateModified`/`pages` solo cuando cambie contenido significativo; nunca usar la fecha automática del build. Si se edita un artículo, actualizar también su fecha visible y el sitemap a través de este archivo.
- `blogSeo.js`: ajustes de título y descripción para metadatos. El texto editorial original permanece en `blogArticles.js`.

## Estado de la auditoría GEO (18/09/2026)

Se implementaron testimonios escritos en HTML inicial, contacto visible y schema de organización/oficina, perfiles sociales, servicios individuales, FAQPage y anchors accesibles, breadcrumbs y fechas del blog, sitemap con biblioteca y lastmod, y metadatos concisos para los 33 artículos.

Los videos testimoniales usan posters extraídos de los originales y `preload="none"` para que las copias del carrusel no descarguen metadatos al montar. La reproducción se limita a las tarjetas visibles y la promesa de reproducción maneja rechazos del navegador.

`videoMetadata.json` registra 2025 como año de publicación del video principal y los tres testimoniales, indicado por el usuario. No se añadió VideoObject: falta mes y día para una fecha completa de `uploadDate`, obligatorio para el resultado enriquecido de Google. Incorporarlo cuando se recupere evidencia, junto con nombre, thumbnailUrl y contentUrl reales. No convertir el año en 1 de enero ni usar la fecha del archivo o del commit como sustituto.

No se añadió AggregateRating: no hay puntuaciones verificadas, y las reseñas sobre la propia organización no habilitan estrellas de Google. Los testimonios se mantienen como contenido publicado, sin ratings inventados.

Cinco fotos tienen nombre respaldado por `MEMBERS` y el archivo correspondiente. `chica-small.webp` conserva su imagen y usa «Equipo de Agencia KLIV»: su identidad no se deduce del registro `chica_small.webp`, que es otro nombre de archivo. Confirmar esa persona antes de nombrarla.

El redirect directo de www requiere conectar ese dominio al entorno Production en Vercel, después de publicar las reglas de host de `next.config.js`. La home www redirige a `/es/`; las otras rutas conservan su path. No configurar todo www hacia `/es/`, porque perdería las URLs de artículos.

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
