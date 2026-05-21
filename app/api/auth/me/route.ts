import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";
import { sessionCookieName } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return NextResponse.json({ data: { user: null } });
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/auth/me`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "x-session-token": token
      }
    });

    if (!response.ok) {
      return NextResponse.json({ data: { user: null } });
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ data: { user: null } });
  }
}
