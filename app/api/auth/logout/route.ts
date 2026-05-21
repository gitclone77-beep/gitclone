import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";
import { sessionCookieName } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (token) {
    try {
      await fetch(`${getApiBaseUrl()}/api/auth/logout`, {
        method: "POST",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "x-session-token": token
        }
      });
    } catch {
      // Clearing the local cookie is still the correct user-visible result.
    }
  }

  const response = NextResponse.json({ data: { ok: true } });
  response.cookies.set(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });

  return response;
}
