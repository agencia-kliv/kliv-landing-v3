# Contenido local

- `billing.json`: tarifas y servicios recuperados el 7 de septiembre de 2026. Se conservaron los valores originales, incluidos campos vacíos.
- `partners.json`: orden de las imágenes de socios. Los archivos están en `public/partners/`.
- `clientPortals.json`: portales de clientes. Cada entrada `"Nombre": { "name": "Nombre", "url": "https://..." }` hace que `/cliente/Nombre/` (y en minúsculas) redirija a esa URL. Usar nombres sin espacios ni acentos.

Para actualizar contenido, editar estos archivos y publicar el proyecto por el flujo habitual de GitHub/Vercel. El panel anterior está retirado y devuelve 404. La web ya no necesita Firebase para leer ni modificar este contenido.
