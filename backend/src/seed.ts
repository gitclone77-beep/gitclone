import type { DatabaseShape } from "./types";

const now = new Date().toISOString();

export function createSeedData(): DatabaseShape {
  const repositories = [
    {
      id: "repo_orbital_ui",
      name: "orbital-ui",
      slug: "orbital-ui",
      owner: "gitclone-labs",
      description: "Premium component system for deployment dashboards and repository surfaces.",
      category: "SaaS",
      language: "TypeScript",
      visibility: "public" as const,
      defaultBranch: "main",
      storageMb: 384,
      stars: 18400,
      forks: 2100,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "repo_neural_router",
      name: "neural-router",
      slug: "neural-router",
      owner: "gitclone-labs",
      description: "Low-latency inference gateway with branch-level preview routing.",
      category: "AI",
      language: "TypeScript",
      visibility: "public" as const,
      defaultBranch: "main",
      storageMb: 612,
      stars: 12700,
      forks: 940,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "repo_deploy_core",
      name: "deploy-core",
      slug: "deploy-core",
      owner: "gitclone-cloud",
      description: "Preview deployment orchestration, status checks, and rollback intelligence.",
      category: "Infrastructure",
      language: "Rust",
      visibility: "private" as const,
      defaultBranch: "stable",
      storageMb: 925,
      stars: 9800,
      forks: 1400,
      createdAt: now,
      updatedAt: now
    }
  ];

  return {
    meta: {
      name: "GitClone",
      version: 1,
      initializedAt: now
    },
    users: [],
    sessions: [],
    repositories,
    branches: [
      {
        id: "branch_orbital_main",
        repositoryId: "repo_orbital_ui",
        name: "main",
        commitCount: 428,
        status: "protected",
        previewUrl: "https://orbital-ui.gitclone.dev",
        updatedAt: now
      },
      {
        id: "branch_orbital_insights",
        repositoryId: "repo_orbital_ui",
        name: "feature/repo-insights",
        commitCount: 18,
        status: "preview",
        previewUrl: "https://repo-insights.gitclone.dev",
        updatedAt: now
      },
      {
        id: "branch_deploy_stable",
        repositoryId: "repo_deploy_core",
        name: "stable",
        commitCount: 901,
        status: "protected",
        previewUrl: "https://deploy-core.gitclone.dev",
        updatedAt: now
      }
    ],
    issues: [
      {
        id: "issue_gc_128",
        repositoryId: "repo_orbital_ui",
        key: "GC-128",
        title: "Audit branch permission drift",
        status: "open",
        priority: "high",
        assignee: "Mira Chen",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "issue_gc_132",
        repositoryId: "repo_neural_router",
        key: "GC-132",
        title: "Improve issue search ranking",
        status: "in_progress",
        priority: "medium",
        assignee: "Owen Vale",
        createdAt: now,
        updatedAt: now
      }
    ],
    pullRequests: [
      {
        id: "pr_248",
        repositoryId: "repo_orbital_ui",
        number: 248,
        title: "Add repository insight cards",
        sourceBranch: "feature/repo-insights",
        targetBranch: "main",
        status: "review",
        reviewers: ["Mira Chen", "Nadia Frost"],
        checksPassed: 8,
        checksTotal: 8,
        createdAt: now,
        updatedAt: now
      },
      {
        id: "pr_252",
        repositoryId: "repo_deploy_core",
        number: 252,
        title: "Harden preview deployment status polling",
        sourceBranch: "fix/preview-polling",
        targetBranch: "stable",
        status: "approved",
        reviewers: ["Owen Vale"],
        checksPassed: 7,
        checksTotal: 9,
        createdAt: now,
        updatedAt: now
      }
    ],
    deployments: [
      {
        id: "dep_prod_orbital",
        repositoryId: "repo_orbital_ui",
        environment: "production",
        branch: "main",
        status: "ready",
        url: "https://orbital-ui.gitclone.dev",
        commitSha: "7fd42a1",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "dep_prev_orbital",
        repositoryId: "repo_orbital_ui",
        environment: "preview",
        branch: "feature/repo-insights",
        status: "building",
        url: "https://repo-insights.gitclone.dev",
        commitSha: "3ac99d4",
        createdAt: now,
        updatedAt: now
      }
    ]
  };
}
