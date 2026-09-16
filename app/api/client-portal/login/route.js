import {
  CLIENT_PORTAL_COOKIE,
  createPortalSession,
  portalSessionMaxAge,
  verifyPortalPassword,
} from "@/lib/clientPortalAuth";
import { getPortalData } from "@/lib/portals";
import { NextResponse } from "next/server";

export async function POST(request) {
  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("x-forwarded-host") || request.headers.get("host");

  if (origin && requestHost && new URL(origin).host !== requestHost) {
    return new NextResponse("Solicitud no válida", { status: 403 });
  }

  const form = await request.formData();
  const client = String(form.get("client") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const portal = await getPortalData(client);

  if (!portal) return new NextResponse("Portal no encontrado", { status: 404 });

  const destination = `/cliente/${client}/`;
  if (!verifyPortalPassword(client, password)) {
    return new NextResponse(null, {
      status: 303,
      headers: { Location: `${destination}?error=password` },
    });
  }

  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: destination },
  });

  response.cookies.set({
    name: CLIENT_PORTAL_COOKIE,
    value: createPortalSession(client),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/cliente",
    maxAge: portalSessionMaxAge,
  });

  return response;
}
