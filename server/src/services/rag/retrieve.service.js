import OpenAI from "openai"
import { QdrantClient } from "@qdrant/js-client-rest"
import { OPENAI_API_KEY, QDRANT_URL, QDRANT_API_KEY } from "../../config/envConfig.js"

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
})

const qdrant = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  checkCompatibility: false
})

const COLLECTION = "portfolio_chunks"

const SCORE_THRESHOLD = 0.35; // Cosine similarity — below this = unrelated

/**
 * Retrieve relevant portfolio chunks for a query
 * @param {string} query
 * @param {number} topK
 * @returns {Array<{text, title, chunkType, score}>}
 */
export async function retrieveContext(query, topK = 5) {
  // 1️⃣ Embed the query
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: query
  })

  const queryVector = embeddingResponse.data[0].embedding

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
