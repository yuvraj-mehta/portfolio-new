import { normalizePortfolio } from "./normalize.service.js";
import { embedPortfolio } from "./embed.service.js";

import { fileURLToPath } from "url";

/**
 * Runs the full RAG (Retrieval-Augmented Generation) ingestion pipeline.
 * Synchronously normalizes raw portfolio data into semantic chunks, and then
 * generates and indexes vector embeddings into the Qdrant DB.
 * Called automatically or executed directly during deployment/updates.
 *
 * @async
 * @returns {Promise<void>} Resolves when the entire pipeline finishes successfully.
 * @throws {Error} If normalization or embedding stages fail.
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
