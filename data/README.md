# Contenido local

- `billing.json`: tarifas y servicios recuperados el 7 de septiembre de 2026. Se conservaron los valores originales, incluidos campos vacíos.
- `partners.json`: orden de las imágenes de socios. Los archivos están en `public/partners/`.
- `clientPortals.json`: portales de clientes que siguen siendo un redirect externo. Cada entrada `"Nombre": { "name": "Nombre", "url": "https://..." }` hace que `/cliente/Nombre/` (y en minúsculas) redirija a esa URL. Usar nombres sin espacios ni acentos.
- `portals/<slug>.json`: portales que son página real del sitio (sin redirect, sin login, con noindex), servidos en `/cliente/<slug>/` por `app/cliente/[slug]/page.js`. Un cliente vive en uno de los dos sistemas, nunca en ambos: si se migra de redirect a página real, hay que sacar su entrada de `clientPortals.json` (si no, el redirect lo intercepta antes de llegar a la página). El registro de slugs válidos está en `lib/portals.js`.

Para actualizar contenido, editar estos archivos y publicar el proyecto por el flujo habitual de GitHub/Vercel. El panel anterior está retirado y devuelve 404. La web ya no necesita Firebase para leer ni modificar este contenido.
