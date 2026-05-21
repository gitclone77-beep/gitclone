import { z } from "zod";

export const repositorySchema = z.object({
  name: z.string().min(2).max(80),
  owner: z.string().min(2).max(80),
  description: z.string().min(4).max(240),
  category: z.string().min(2).max(40),
  language: z.string().min(1).max(40),
  visibility: z.enum(["public", "private"]),
  defaultBranch: z.string().min(1).max(60).optional()
});

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(1).max(128)
});

export const issueSchema = z.object({
  repositoryId: z.string().min(1),
  title: z.string().min(4).max(180),
  priority: z.enum(["low", "medium", "high"]),
  assignee: z.string().min(2).max(80)
});

export const issueStatusSchema = z.object({
  status: z.enum(["open", "in_progress", "closed"])
});

export const pullRequestSchema = z.object({
  repositoryId: z.string().min(1),
  title: z.string().min(4).max(180),
  sourceBranch: z.string().min(1).max(80),
  targetBranch: z.string().min(1).max(80),
  reviewers: z.array(z.string().min(2).max(80)).max(8).default([])
});

export const pullRequestStatusSchema = z.object({
  status: z.enum(["draft", "review", "approved", "merged"])
});

export const deploymentSchema = z.object({
  repositoryId: z.string().min(1),
  environment: z.enum(["preview", "staging", "production"]),
  branch: z.string().min(1).max(80),
  url: z.string().url(),
  commitSha: z.string().min(6).max(64)
});

export const deploymentStatusSchema = z.object({
  status: z.enum(["queued", "building", "ready", "failed"])
});
