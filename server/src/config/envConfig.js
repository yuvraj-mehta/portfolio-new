import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000;

// GenAI Provider variables
export const GENAI_PROVIDER = process.env.GENAI_PROVIDER || "openai";

// Resolve model defaults if not specified
const defaultEmbeddingModel = GENAI_PROVIDER === "gemini" ? "gemini-embedding-001" : "text-embedding-3-large";
const defaultChatModel = GENAI_PROVIDER === "gemini" ? "gemini-2.5-flash" : "gpt-4o-mini";

export const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || defaultEmbeddingModel;
export const CHAT_MODEL = process.env.CHAT_MODEL || defaultChatModel;

// Standard Qdrant configs (always required)
export const QDRANT_URL = process.env.QDRANT_URL;
export const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

if (!QDRANT_URL || !QDRANT_API_KEY) {
  throw new Error(`CRITICAL STARTUP ERROR: Missing required environment variable: QDRANT_URL or QDRANT_API_KEY`);
}

// Conditional API key checks based on provider
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const GEMINI_API_KEYS = process.env.GEMINI_API_KEYS
  ? process.env.GEMINI_API_KEYS.split(",").map((k) => k.trim()).filter(Boolean)
  : process.env.GEMINI_API_KEY
  ? [process.env.GEMINI_API_KEY]
  : [];

if (GENAI_PROVIDER === "openai" && !OPENAI_API_KEY) {
  throw new Error(`CRITICAL STARTUP ERROR: Missing required environment variable: OPENAI_API_KEY for provider 'openai'`);
}

if (GENAI_PROVIDER === "gemini" && GEMINI_API_KEYS.length === 0) {
  throw new Error(`CRITICAL STARTUP ERROR: Missing required environment variable: GEMINI_API_KEYS or GEMINI_API_KEY for provider 'gemini'`);
}

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(s => s.trim())
  : ["http://localhost:5173", "http://localhost:3000"];