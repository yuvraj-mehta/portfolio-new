import { normalizePortfolio } from "./normalize.service.js";
import { embedPortfolio } from "./embed.service.js";

import { fileURLToPath } from "url";

/**
 * Run the full RAG ingestion pipeline: normalize → embed
 * Called after new portfolio data is ingested via POST /api/profile/init
 */
export async function runRagPipeline() {
  await normalizePortfolio();
  await embedPortfolio();
}

// Allow direct script execution during development
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("🚀 Starting manual RAG Ingestion Pipeline (normalize -> embed)...");
  runRagPipeline()
    .then(() => console.log("✅ RAG Ingestion Pipeline completed successfully!"))
    .catch((err) => {
      console.error("❌ RAG Ingestion Pipeline failed:", err);
      process.exit(1);
    });
}
