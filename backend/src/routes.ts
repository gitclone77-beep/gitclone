import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { ApiConfig } from "./config";
import type { JsonDatabase } from "./database";
import {
  deploymentSchema,
  deploymentStatusSchema,
  issueSchema,
  issueStatusSchema,
  loginSchema,
  pullRequestSchema,
  pullRequestStatusSchema,
  registerSchema,
  repositorySchema
} from "./schemas";

type RouteParams = {
  id?: string;
  repositoryId?: string;
};

export async function registerRoutes(
  app: FastifyInstance,
  db: JsonDatabase,
  config: ApiConfig
) {
  const requireWriteAccess = async (request: FastifyRequest, reply: FastifyReply) => {
    if (!config.apiKey) return;

    const incomingKey = request.headers["x-api-key"];
    if (incomingKey !== config.apiKey) {
      return reply.code(401).send({
        error: "Unauthorized",
        message: "Missing or invalid API key"
      });
    }
  };

  app.get("/health", async () => ({
    status: "ok",
    service: "gitclone-api",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  }));

  app.post("/api/auth/register", async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
    }

    try {
      const user = await db.createUser(parsed.data);
      const session = await db.createSession(user.id);

      return reply.code(201).send({
        data: {
          user,
          session: {
            token: session.token,
            expiresAt: session.expiresAt
          }
        }
      });
    } catch (error) {
      return reply.code(409).send({ error: "Conflict", message: getErrorMessage(error) });
    }
  });

  app.post("/api/auth/login", async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
    }

    const user = db.verifyUser(parsed.data.email, parsed.data.password);
    if (!user) {
      return reply.code(401).send({
        error: "Unauthorized",
        message: "Invalid email or password"
      });
    }

    const session = await db.createSession(user.id);
    return {
      data: {
        user,
        session: {
          token: session.token,
          expiresAt: session.expiresAt
        }
      }
    };
  });

  app.get("/api/auth/me", async (request, reply) => {
    const user = db.getUserBySession(getSessionToken(request));
    if (!user) {
      return reply.code(401).send({
        error: "Unauthorized",
        message: "Sign in required"
      });
    }

    return { data: { user } };
  });

  app.post("/api/auth/logout", async (request) => {
    await db.deleteSession(getSessionToken(request));
    return { data: { ok: true } };
  });

  app.get("/api/stats", async () => ({
    data: db.getStats()
  }));

  app.get("/api/repositories", async () => ({
    data: db.listRepositories()
  }));

  app.post(
    "/api/repositories",
    { preHandler: requireWriteAccess },
    async (request, reply) => {
      const parsed = repositorySchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
      }

      const data = await db.createRepository(parsed.data);
      return reply.code(201).send({ data });
    }
  );

  app.get<{ Params: RouteParams }>("/api/repositories/:id", async (request, reply) => {
    const repository = db.getRepository(request.params.id ?? "");
    if (!repository) {
      return reply.code(404).send({ error: "NotFound", message: "Repository not found" });
    }

    return {
      data: {
        repository,
        branches: db.listBranches(repository.id),
        issues: db.listIssues(repository.id),
        pullRequests: db.listPullRequests(repository.id),
        deployments: db.listDeployments(repository.id)
      }
    };
  });

  app.get<{ Params: RouteParams }>("/api/repositories/:repositoryId/issues", async (request) => ({
    data: db.listIssues(request.params.repositoryId)
  }));

  app.post("/api/issues", { preHandler: requireWriteAccess }, async (request, reply) => {
    const parsed = issueSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
    }

    try {
      const issue = await db.createIssue(parsed.data);
      return reply.code(201).send({ data: issue });
    } catch (error) {
      return reply.code(404).send({ error: "NotFound", message: getErrorMessage(error) });
    }
  });

  app.patch<{ Params: RouteParams }>(
    "/api/issues/:id/status",
    { preHandler: requireWriteAccess },
    async (request, reply) => {
      const parsed = issueStatusSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
      }

      const issue = await db.updateIssueStatus(request.params.id ?? "", parsed.data.status);
      if (!issue) {
        return reply.code(404).send({ error: "NotFound", message: "Issue not found" });
      }

      return { data: issue };
    }
  );

  app.get<{ Params: RouteParams }>(
    "/api/repositories/:repositoryId/pull-requests",
    async (request) => ({
      data: db.listPullRequests(request.params.repositoryId)
    })
  );

  app.post("/api/pull-requests", { preHandler: requireWriteAccess }, async (request, reply) => {
    const parsed = pullRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
    }

    try {
      const pullRequest = await db.createPullRequest(parsed.data);
      return reply.code(201).send({ data: pullRequest });
    } catch (error) {
      return reply.code(404).send({ error: "NotFound", message: getErrorMessage(error) });
    }
  });

  app.patch<{ Params: RouteParams }>(
    "/api/pull-requests/:id/status",
    { preHandler: requireWriteAccess },
    async (request, reply) => {
      const parsed = pullRequestStatusSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
      }

      const pullRequest = await db.updatePullRequestStatus(
        request.params.id ?? "",
        parsed.data.status
      );
      if (!pullRequest) {
        return reply.code(404).send({ error: "NotFound", message: "Pull request not found" });
      }

      return { data: pullRequest };
    }
  );

  app.get<{ Params: RouteParams }>(
    "/api/repositories/:repositoryId/deployments",
    async (request) => ({
      data: db.listDeployments(request.params.repositoryId)
    })
  );

  app.post("/api/deployments", { preHandler: requireWriteAccess }, async (request, reply) => {
    const parsed = deploymentSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
    }

    try {
      const deployment = await db.createDeployment(parsed.data);
      return reply.code(201).send({ data: deployment });
    } catch (error) {
      return reply.code(404).send({ error: "NotFound", message: getErrorMessage(error) });
    }
  });

  app.patch<{ Params: RouteParams }>(
    "/api/deployments/:id/status",
    { preHandler: requireWriteAccess },
    async (request, reply) => {
      const parsed = deploymentStatusSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send({ error: "ValidationError", details: parsed.error.flatten() });
      }

      const deployment = await db.updateDeploymentStatus(
        request.params.id ?? "",
        parsed.data.status
      );
      if (!deployment) {
        return reply.code(404).send({ error: "NotFound", message: "Deployment not found" });
      }

      return { data: deployment };
    }
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Request failed";
}

function getSessionToken(request: FastifyRequest) {
  const authorization = request.headers.authorization;
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  const token = request.headers["x-session-token"];
  return Array.isArray(token) ? token[0] : token ?? "";
}
