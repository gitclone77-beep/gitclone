import { NextResponse } from "next/server";
import { getApiBaseUrl, getApiKey } from "@/lib/api";

export async function GET() {
  return proxyToApiService("/api/repositories", {
    method: "GET"
  });
}

export async function POST(request: Request) {
  const body = await request.text();

  return proxyToApiService("/api/repositories", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function proxyToApiService(path: string, init: RequestInit) {
  try {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");

    const apiKey = getApiKey();
    if (apiKey) {
      headers.set("x-api-key", apiKey);
    }

    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...init,
      headers,
      cache: "no-store"
    });
    const payload = await response.text();

    return new NextResponse(payload, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "application/json"
      }
    });
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
