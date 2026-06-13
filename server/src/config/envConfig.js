import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000;

const requiredEnvVars = ["OPENAI_API_KEY", "QDRANT_URL", "QDRANT_API_KEY"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`CRITICAL STARTUP ERROR: Missing required environment variable: ${envVar}`);
  }
}

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const QDRANT_URL = process.env.QDRANT_URL;
export const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(s => s.trim())
  : ["http://localhost:5173", "http://localhost:3000"];