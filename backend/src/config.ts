import { resolve } from "node:path";

export type ApiConfig = {
  host: string;
  port: number;
  databaseFile: string;
  frontendOrigins: string[];
  apiKey?: string;
  nodeEnv: string;
};

export function getConfig(): ApiConfig {
  const port = Number.parseInt(process.env.PORT ?? "4000", 10);
  const frontendOrigins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return {
    host: process.env.HOST ?? "0.0.0.0",
    port: Number.isFinite(port) ? port : 4000,
    databaseFile: resolve(process.env.DATABASE_FILE ?? "./data/gitclone.db.json"),
    frontendOrigins,
    apiKey: process.env.API_KEY || undefined,
    nodeEnv: process.env.NODE_ENV ?? "development"
  };
}
