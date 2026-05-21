export type ApiRepository = {
  id: string;
  name: string;
  slug: string;
  owner: string;
  description: string;
  category: string;
  language: string;
  visibility: "public" | "private";
  defaultBranch: string;
  storageMb: number;
  stars: number;
  forks: number;
  createdAt: string;
  updatedAt: string;
};

export type ApiStats = {
  repositories: number;
  privateRepositories: number;
  openIssues: number;
  activePullRequests: number;
  readyDeployments: number;
  totalStorageMb: number;
};

export type ApiHealth = {
  status: string;
  service: string;
  timestamp: string;
  environment: string;
};

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type DashboardData = {
  apiBaseUrl: string;
  health: ApiHealth | null;
  stats: ApiStats | null;
  repositories: ApiRepository[];
};
