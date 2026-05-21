export type Visibility = "public" | "private";
export type IssueStatus = "open" | "in_progress" | "closed";
export type PullRequestStatus = "draft" | "review" | "approved" | "merged";
export type DeploymentStatus = "queued" | "building" | "ready" | "failed";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  id: string;
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

export type Repository = {
  id: string;
  name: string;
  slug: string;
  owner: string;
  description: string;
  category: string;
  language: string;
  visibility: Visibility;
  defaultBranch: string;
  storageMb: number;
  stars: number;
  forks: number;
  createdAt: string;
  updatedAt: string;
};

export type Branch = {
  id: string;
  repositoryId: string;
  name: string;
  commitCount: number;
  status: "active" | "preview" | "protected";
  previewUrl?: string;
  updatedAt: string;
};

export type Issue = {
  id: string;
  repositoryId: string;
  key: string;
  title: string;
  status: IssueStatus;
  priority: "low" | "medium" | "high";
  assignee: string;
  createdAt: string;
  updatedAt: string;
};

export type PullRequest = {
  id: string;
  repositoryId: string;
  number: number;
  title: string;
  sourceBranch: string;
  targetBranch: string;
  status: PullRequestStatus;
  reviewers: string[];
  checksPassed: number;
  checksTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type Deployment = {
  id: string;
  repositoryId: string;
  environment: "preview" | "staging" | "production";
  branch: string;
  status: DeploymentStatus;
  url: string;
  commitSha: string;
  createdAt: string;
  updatedAt: string;
};

export type DatabaseShape = {
  meta: {
    name: "GitClone";
    version: number;
    initializedAt: string;
  };
  users: User[];
  sessions: Session[];
  repositories: Repository[];
  branches: Branch[];
  issues: Issue[];
  pullRequests: PullRequest[];
  deployments: Deployment[];
};

export type PlatformStats = {
  repositories: number;
  privateRepositories: number;
  openIssues: number;
  activePullRequests: number;
  readyDeployments: number;
  totalStorageMb: number;
};
