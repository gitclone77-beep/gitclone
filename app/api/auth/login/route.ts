import { NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api";
import { getSessionCookieOptions, sessionCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  return authenticate(request, "/api/auth/login");
}

async function authenticate(request: Request, path: string) {
  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: "POST",
      body: await request.text(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });
    const payload = await response.json();
    const nextResponse = NextResponse.json(payload, { status: response.status });
    const token = payload?.data?.session?.token;

    if (response.ok && typeof token === "string") {
      nextResponse.cookies.set(sessionCookieName, token, getSessionCookieOptions());
    }

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        error: "ApiServiceUnavailable",
        message: "GitClone API service is not reachable"
      },
      { status: 502 }
    );
  }
}
