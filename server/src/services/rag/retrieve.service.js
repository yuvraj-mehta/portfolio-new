import { QdrantClient } from "@qdrant/js-client-rest"
import { QDRANT_URL, QDRANT_API_KEY } from "../../config/envConfig.js"
import { GenAIService } from "./genai.service.js"

const qdrant = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  checkCompatibility: false
})

const SCORE_THRESHOLD = 0.35; // Cosine similarity — below this = unrelated

/**
 * Retrieve relevant portfolio chunks for a query
 * @param {string} query
 * @param {number} topK
 * @returns {Array<{text, title, chunkType, score}>}
 */
export async function retrieveContext(query, topK = 5) {
  const COLLECTION = GenAIService.getCollectionName()

  // 1️⃣ Embed the query
  const embeddings = await GenAIService.generateEmbeddings([query])
  const queryVector = embeddings[0]

  // 2️⃣ Search Qdrant
  const results = await qdrant.search(COLLECTION, {
    vector: queryVector,
    limit: topK,
    with_payload: true,
    score_threshold: SCORE_THRESHOLD
  })

  // 3️⃣ Map results into clean context objects
  return results.map(r => ({
    score: r.score,
    text: r.payload.text,
    title: r.payload.title,
    chunkType: r.payload.chunkType
  }))
}
