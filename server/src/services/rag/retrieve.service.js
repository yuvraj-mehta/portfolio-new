import { QdrantClient } from "@qdrant/js-client-rest"
import { QDRANT_URL, QDRANT_API_KEY } from "../../config/envConfig.js"
import { GenAIService } from "./genai.service.js"

const qdrant = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  checkCompatibility: false
})

const SCORE_THRESHOLD = 0.1; // Lowered for Gemini — gemini-embedding-001 scores tend to be lower than OpenAI

/**
 * Queries the Qdrant database to find matching portfolio context chunks for a query.
 * First generates embeddings for the query, retrieves the top-K scoring points,
 * filters out matches below similarity score thresholds, and maps them to context results.
 *
 * @async
 * @param {string} query - The trimmed search text query.
 * @param {number} [topK=5] - The maximum number of points to retrieve from Qdrant.
 * @returns {Promise<Array<{score: number, text: string, title: string, chunkType: string}>>} Resolves with a list of matched context objects.
 * @throws {Error} If vector generation or Qdrant search queries fail.
 */
export async function retrieveContext(query, topK = 5) {
  const COLLECTION = GenAIService.getCollectionName()

  // 1️⃣ Embed the query
  const embeddings = await GenAIService.generateEmbeddings([query])
  const queryVector = embeddings[0]

  // 2️⃣ Search Qdrant (also fetch without threshold first to see raw scores)
  const rawResults = await qdrant.search(COLLECTION, {
    vector: queryVector,
    limit: topK,
    with_payload: true,
  })

  console.log(`[Retrieve] Top ${rawResults.length} raw scores:`, rawResults.map(r => r.score.toFixed(4)).join(", ") || "none");

  const results = rawResults.filter(r => r.score >= SCORE_THRESHOLD);
  console.log(`[Retrieve] After threshold (${SCORE_THRESHOLD}): ${results.length} results`);

  // 3️⃣ Map results into clean context objects
  return results.map(r => ({
    score: r.score,
    text: r.payload.text,
    title: r.payload.title,
    chunkType: r.payload.chunkType
  }))
}
