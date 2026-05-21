import type { ApiHealth, ApiRepository, ApiStats, DashboardData } from "@/types/api";

const fallbackStats: ApiStats = {
  repositories: 0,
  privateRepositories: 0,
  openIssues: 0,
  activePullRequests: 0,
  readyDeployments: 0,
  totalStorageMb: 0
};

export function getApiBaseUrl() {
  return (
    process.env.GITCLONE_API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000"
  ).replace(/\/$/, "");
}

export function getApiKey() {
  return process.env.GITCLONE_API_KEY;
}

export async function getDashboardData(): Promise<DashboardData> {
  const apiBaseUrl = getApiBaseUrl();
  const [health, stats, repositories] = await Promise.all([
    fetchJson<ApiHealth>(`${apiBaseUrl}/health`),
    fetchJson<{ data: ApiStats }>(`${apiBaseUrl}/api/stats`),
    fetchJson<{ data: ApiRepository[] }>(`${apiBaseUrl}/api/repositories`)
  ]);

  return {
    apiBaseUrl,
    health,
    stats: stats?.data ?? fallbackStats,
    repositories: repositories?.data ?? []
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}
