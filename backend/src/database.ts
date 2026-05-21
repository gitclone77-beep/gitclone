import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { createSeedData } from "./seed";
import type {
  Branch,
  DatabaseShape,
  Deployment,
  DeploymentStatus,
  Issue,
  IssueStatus,
  PlatformStats,
  PullRequest,
  PullRequestStatus,
  Repository,
  User
} from "./types";

type RepositoryInput = {
  name: string;
  owner: string;
  description: string;
  category: string;
  language: string;
  visibility: Repository["visibility"];
  defaultBranch?: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type IssueInput = {
  repositoryId: string;
  title: string;
  priority: Issue["priority"];
  assignee: string;
};

type PullRequestInput = {
  repositoryId: string;
  title: string;
  sourceBranch: string;
  targetBranch: string;
  reviewers: string[];
};

type DeploymentInput = {
  repositoryId: string;
  environment: Deployment["environment"];
  branch: string;
  url: string;
  commitSha: string;
};

export class JsonDatabase {
  private data: DatabaseShape | null = null;

  constructor(private readonly filePath: string) {}

  async init() {
    await mkdir(dirname(this.filePath), { recursive: true });

    try {
      const raw = await readFile(this.filePath, "utf8");
      this.data = JSON.parse(raw) as DatabaseShape;
      if (this.ensureCollections()) {
        await this.persist();
      }
    } catch {
      this.data = createSeedData();
      await this.persist();
    }
  }

  async createUser(input: RegisterInput) {
    const data = this.getData();
    const email = normalizeEmail(input.email);

    if (data.users.some((user) => user.email === email)) {
      throw new Error("Email already registered");
    }

    const now = new Date().toISOString();
    const salt = randomBytes(16).toString("hex");
    const user: User = {
      id: `user_${randomUUID()}`,
      name: input.name.trim(),
      email,
      passwordHash: hashPassword(input.password, salt),
      passwordSalt: salt,
      createdAt: now,
      updatedAt: now
    };

    data.users.push(user);
    await this.persist();

    return toPublicUser(user);
  }

  verifyUser(emailInput: string, password: string) {
    const email = normalizeEmail(emailInput);
    const user = this.getData().users.find((item) => item.email === email);

    if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
      return null;
    }

    return toPublicUser(user);
  }

  async createSession(userId: string) {
    const data = this.getData();
    const now = new Date();
    const session = {
      id: `session_${randomUUID()}`,
      token: randomBytes(32).toString("hex"),
      userId,
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30).toISOString()
    };

    data.sessions = data.sessions.filter((item) => new Date(item.expiresAt).getTime() > now.getTime());
    data.sessions.push(session);
    await this.persist();

    return session;
  }

  getUserBySession(token: string) {
    if (!token) return null;

    const data = this.getData();
    const session = data.sessions.find((item) => item.token === token);
    if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
      return null;
    }

    const user = data.users.find((item) => item.id === session.userId);
    return user ? toPublicUser(user) : null;
  }

  async deleteSession(token: string) {
    const data = this.getData();
    const before = data.sessions.length;
    data.sessions = data.sessions.filter((item) => item.token !== token);

    if (data.sessions.length !== before) {
      await this.persist();
    }
  }

  getStats(): PlatformStats {
    const data = this.getData();

    return {
      repositories: data.repositories.length,
      privateRepositories: data.repositories.filter((repo) => repo.visibility === "private").length,
      openIssues: data.issues.filter((issue) => issue.status !== "closed").length,
      activePullRequests: data.pullRequests.filter((pr) => pr.status !== "merged").length,
      readyDeployments: data.deployments.filter((deployment) => deployment.status === "ready").length,
      totalStorageMb: data.repositories.reduce((sum, repo) => sum + repo.storageMb, 0)
    };
  }

  listRepositories() {
    return this.getData().repositories;
  }

  getRepository(idOrSlug: string) {
    return this.getData().repositories.find(
      (repo) => repo.id === idOrSlug || repo.slug === idOrSlug
    );
  }

  async createRepository(input: RepositoryInput) {
    const data = this.getData();
    const now = new Date().toISOString();
    const slug = createUniqueSlug(input.name, data.repositories.map((repo) => repo.slug));
    const repository: Repository = {
      id: `repo_${randomUUID()}`,
      name: input.name,
      slug,
      owner: input.owner,
      description: input.description,
      category: input.category,
      language: input.language,
      visibility: input.visibility,
      defaultBranch: input.defaultBranch || "main",
      storageMb: 0,
      stars: 0,
      forks: 0,
      createdAt: now,
      updatedAt: now
    };
    const branch: Branch = {
      id: `branch_${randomUUID()}`,
      repositoryId: repository.id,
      name: repository.defaultBranch,
      commitCount: 0,
      status: "protected",
      updatedAt: now
    };

    data.repositories.unshift(repository);
    data.branches.unshift(branch);
    await this.persist();

    return { repository, branch };
  }

  listBranches(repositoryId: string) {
    return this.getData().branches.filter((branch) => branch.repositoryId === repositoryId);
  }

  listIssues(repositoryId?: string) {
    const issues = this.getData().issues;
    return repositoryId ? issues.filter((issue) => issue.repositoryId === repositoryId) : issues;
  }

  async createIssue(input: IssueInput) {
    const data = this.getData();
    this.requireRepository(input.repositoryId);

    const now = new Date().toISOString();
    const issue: Issue = {
      id: `issue_${randomUUID()}`,
      repositoryId: input.repositoryId,
      key: `GC-${128 + data.issues.length + 1}`,
      title: input.title,
      status: "open",
      priority: input.priority,
      assignee: input.assignee,
      createdAt: now,
      updatedAt: now
    };

    data.issues.unshift(issue);
    await this.persist();
    return issue;
  }

  async updateIssueStatus(issueId: string, status: IssueStatus) {
    const issue = this.getData().issues.find((item) => item.id === issueId);
    if (!issue) return null;
    issue.status = status;
    issue.updatedAt = new Date().toISOString();
    await this.persist();
    return issue;
  }

  listPullRequests(repositoryId?: string) {
    const pullRequests = this.getData().pullRequests;
    return repositoryId
      ? pullRequests.filter((pullRequest) => pullRequest.repositoryId === repositoryId)
      : pullRequests;
  }

  async createPullRequest(input: PullRequestInput) {
    const data = this.getData();
    this.requireRepository(input.repositoryId);

    const now = new Date().toISOString();
    const pullRequest: PullRequest = {
      id: `pr_${randomUUID()}`,
      repositoryId: input.repositoryId,
      number: 200 + data.pullRequests.length + 1,
      title: input.title,
      sourceBranch: input.sourceBranch,
      targetBranch: input.targetBranch,
      status: "review",
      reviewers: input.reviewers,
      checksPassed: 0,
      checksTotal: 8,
      createdAt: now,
      updatedAt: now
    };

    data.pullRequests.unshift(pullRequest);
    await this.persist();
    return pullRequest;
  }

  async updatePullRequestStatus(pullRequestId: string, status: PullRequestStatus) {
    const pullRequest = this.getData().pullRequests.find((item) => item.id === pullRequestId);
    if (!pullRequest) return null;
    pullRequest.status = status;
    pullRequest.updatedAt = new Date().toISOString();
    await this.persist();
    return pullRequest;
  }

  listDeployments(repositoryId?: string) {
    const deployments = this.getData().deployments;
    return repositoryId
      ? deployments.filter((deployment) => deployment.repositoryId === repositoryId)
      : deployments;
  }

  async createDeployment(input: DeploymentInput) {
    const data = this.getData();
    this.requireRepository(input.repositoryId);

    const now = new Date().toISOString();
    const deployment: Deployment = {
      id: `dep_${randomUUID()}`,
      repositoryId: input.repositoryId,
      environment: input.environment,
      branch: input.branch,
      status: "queued",
      url: input.url,
      commitSha: input.commitSha,
      createdAt: now,
      updatedAt: now
    };

    data.deployments.unshift(deployment);
    await this.persist();
    return deployment;
  }

  async updateDeploymentStatus(deploymentId: string, status: DeploymentStatus) {
    const deployment = this.getData().deployments.find((item) => item.id === deploymentId);
    if (!deployment) return null;
    deployment.status = status;
    deployment.updatedAt = new Date().toISOString();
    await this.persist();
    return deployment;
  }

  private requireRepository(repositoryId: string) {
    const repository = this.getData().repositories.find((repo) => repo.id === repositoryId);
    if (!repository) {
      throw new Error("Repository not found");
    }
  }

  private getData() {
    if (!this.data) {
      throw new Error("Database is not initialized");
    }
    this.ensureCollections();
    return this.data;
  }

  private ensureCollections() {
    if (!this.data) return false;
    let changed = false;

    if (!Array.isArray(this.data.users)) {
      this.data.users = [];
      changed = true;
    }

    if (!Array.isArray(this.data.sessions)) {
      this.data.sessions = [];
      changed = true;
    }

    return changed;
  }

  private async persist() {
    if (!this.data) return;

    const payload = `${JSON.stringify(this.data, null, 2)}\n`;
    const tempPath = `${this.filePath}.tmp`;
    await writeFile(tempPath, payload, "utf8");
    await rename(tempPath, this.filePath);
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

function verifyPassword(password: string, salt: string, expectedHash: string) {
  try {
    const incoming = Buffer.from(hashPassword(password, salt), "hex");
    const expected = Buffer.from(expectedHash, "hex");

    return incoming.length === expected.length && timingSafeEqual(incoming, expected);
  } catch {
    return false;
  }
}

function toPublicUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

function createUniqueSlug(name: string, existingSlugs: string[]) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "repository";

  let slug = base;
  let suffix = 2;

  while (existingSlugs.includes(slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}
