// Dirección y teléfono confirmados por el usuario el 18 de septiembre de 2026.
export const BUSINESS = {
  name: "Agencia KLIV",
  // Razón social, tal como figura en la política de privacidad. La marca visible sigue siendo "Agencia KLIV".
  legalName: "Agencia Kliv LLC",
  telephone: "+5493515504011",
  displayTelephone: "+54 9 351 550-4011",
  email: "contacto@agenciakliv.com",
  addressText: "Rosario de Santa Fe 1106 · piso 6 · oficina E · X5000 · Córdoba, Argentina",
  // Coordenadas del lugar (!3d/!4d), no del centro de la cámara (@),
  // tomadas del enlace de Google Maps compartido por el usuario.
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.4165903,
    longitude: -64.167464,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rosario de Santa Fe 1106, piso 6, oficina E",
    postalCode: "X5000",
    addressLocality: "Córdoba",
    addressRegion: "Córdoba",
    addressCountry: "AR",
  },
};
