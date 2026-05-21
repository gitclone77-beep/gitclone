import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import { getConfig } from "./config";
import { JsonDatabase } from "./database";
import { registerRoutes } from "./routes";

export async function buildServer() {
  const config = getConfig();
  const app = Fastify({
    logger: {
      level: config.nodeEnv === "production" ? "info" : "debug"
    }
  });
  const db = new JsonDatabase(config.databaseFile);

  await db.init();
  await app.register(helmet, {
    global: true
  });
  await app.register(cors, {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (config.frontendOrigins.includes("*") || config.frontendOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed: ${origin}`), false);
    },
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-api-key"]
  });
  await app.register(rateLimit, {
    max: 120,
    timeWindow: "1 minute"
  });
  await registerRoutes(app, db, config);

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    reply.code(500).send({
      error: "InternalServerError",
      message: "GitClone API request failed"
    });
  });

  return { app, config };
}

async function start() {
  const { app, config } = await buildServer();
  await app.listen({
    host: config.host,
    port: config.port
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
