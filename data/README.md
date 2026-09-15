# Contenido local

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
