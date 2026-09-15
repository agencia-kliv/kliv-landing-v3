import { CLIENT_PORTAL_COOKIE } from "@/lib/clientPortalAuth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const form = await request.formData();
  const client = String(form.get("client") || "").trim().toLowerCase();
  const destination = client ? `/cliente/${client}/` : "/es/";

  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: destination },
  });

  response.cookies.set({
    name: CLIENT_PORTAL_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/cliente",
    maxAge: 0,
  });

  return response;
}
