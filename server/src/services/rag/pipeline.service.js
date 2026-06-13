import { normalizePortfolio } from "./normalize.service.js";
import { embedPortfolio } from "./embed.service.js";

/**
 * Run the full RAG ingestion pipeline: normalize → embed
 * Called after new portfolio data is ingested via POST /api/profile/init
 */
export async function runRagPipeline() {
  await normalizePortfolio();
  await embedPortfolio();
}
