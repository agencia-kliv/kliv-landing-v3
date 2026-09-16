import { createHash, createHmac, timingSafeEqual } from "crypto";

export const CLIENT_PORTAL_COOKIE = "kliv_client_portal_session";
export const portalSessionMaxAge = 60 * 60 * 24 * 7;

function digest(value) {
  return createHash("sha256").update(String(value)).digest();
}

function safeEqual(left, right) {
  return timingSafeEqual(digest(left), digest(right));
}

function normalizeClient(client) {
  return String(client || "").trim().toLowerCase();
}

function passwordEnvironmentKey(client) {
  return `${normalizeClient(client).toUpperCase().replace(/[^A-Z0-9]/g, "_")}_PORTAL_PASSWORD`;
}

function sessionSecret() {
  return process.env.CLIENT_PORTAL_SESSION_SECRET || "";
}

function signature(payload) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function verifyPortalPassword(client, password) {
  const expected = process.env[passwordEnvironmentKey(client)] || "";
  return Boolean(expected) && safeEqual(password, expected);
}

export function createPortalSession(client) {
  const payload = Buffer.from(
    JSON.stringify({
      client: normalizeClient(client),
      expiresAt: Math.floor(Date.now() / 1000) + portalSessionMaxAge,
    })
  ).toString("base64url");

  return `${payload}.${signature(payload)}`;
}

export function verifyPortalSession(token, expectedClient) {
  if (!token || !sessionSecret()) return false;

  const [payload, receivedSignature] = token.split(".");
  if (!payload || !receivedSignature) return false;
  if (!safeEqual(receivedSignature, signature(payload))) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return (
      session.client === normalizeClient(expectedClient) &&
      Number(session.expiresAt) > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
