import { getMessages } from "./metadata";

// Landings de servicio (/es/cordoba/, /es/metaads/, /es/googleads/). Todas
// renderizan la misma LandingPage que la home; lo único que cambia es el
// copy, que se superpone a messages/<locale>.json con lo que haya en
// messages/landings/<locale>.json bajo la clave de cada landing.
//
// `platforms` decide qué logos y badges de partner se muestran: una landing
// de Meta Ads no debería exhibir el badge de Google.
export const LANDINGS = {
  cordoba: { platforms: ["meta", "google", "tiktok"] },
  metaads: { platforms: ["meta"] },
  googleads: { platforms: ["google"] },
};

const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);

function deepMerge(base, override) {
  if (!isObject(override)) return override;
  const result = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = isObject(value) && isObject(base?.[key]) ? deepMerge(base[key], value) : value;
  }
  return result;
}

export async function getLandingMessages(slug, locale) {
  const base = await getMessages(locale);
  const overrides = (await import(`../messages/landings/${locale}.json`)).default;
  return deepMerge(base, overrides[slug]);
}
