import { cookies } from "next/headers";
import { getApiBaseUrl } from "@/lib/api";
import type { ApiUser } from "@/types/api";

export const sessionCookieName = "gitclone_session";

export async function getCurrentUser(): Promise<ApiUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return null;
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
      return null;
    }

    const payload = (await response.json()) as { data?: { user?: ApiUser } };
    return payload.data?.user ?? null;
  } catch {
    return null;
  }
}

export function getSessionCookieOptions(maxAge = 60 * 60 * 24 * 30) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge
  };
}
