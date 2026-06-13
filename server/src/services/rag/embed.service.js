import fs from "fs"
import { QdrantClient } from "@qdrant/js-client-rest"
import { QDRANT_URL, QDRANT_API_KEY } from "../../config/envConfig.js"
import { GenAIService } from "./genai.service.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const qdrant = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  checkCompatibility: false
})

const DATA_PATH = path.join(__dirname, "../../data/normalized.json")

// Convert string ID to numeric ID
function hashStringToId(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

export async function embedPortfolio() {
  const COLLECTION = GenAIService.getCollectionName()
  const VECTOR_SIZE = GenAIService.getVectorSize()

  // Ensure collection exists before upserting points
  try {
    const info = await qdrant.getCollection(COLLECTION)
    const existingSize = info?.config?.params?.vectors?.size || info?.result?.config?.params?.vectors?.size
    if (existingSize && existingSize !== VECTOR_SIZE) {
      console.log(`⚠️ Dimension mismatch in Qdrant collection '${COLLECTION}' (existing: ${existingSize}, requested: ${VECTOR_SIZE}). Recreating collection...`)
      await qdrant.deleteCollection(COLLECTION)
      throw { status: 404, message: "Recreating due to dimension mismatch" }
    }
  } catch (err) {
    const msg = err?.data?.status?.error || err?.message || ""
    const isNotFound = err?.status === 404 || /Not found/i.test(msg) || msg.includes("Recreating")
    const isAlreadyExists = err?.status === 409 || /Already exists/i.test(msg)

    if (isNotFound) {
      await qdrant.createCollection(COLLECTION, {
        vectors: {
          size: VECTOR_SIZE,
          distance: "Cosine"
        }
      })
      console.log(`✅ Created collection '${COLLECTION}' (size: ${VECTOR_SIZE})`)
    } else if (!isAlreadyExists) {
      throw err
    }
  }

  const raw = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"))

  const embeddableChunks = raw.chunks.filter(c => c.shouldEmbed);
  const points = [];

  if (embeddableChunks.length > 0) {
    console.log(`Generating embeddings using provider '${GenAIService.getProvider()}' for model '${GenAIService.getEmbeddingModel()}'...`);
    const embeddings = await GenAIService.generateEmbeddings(embeddableChunks.map(c => c.text));

    embeddableChunks.forEach((chunk, i) => {
      points.push({
        id: hashStringToId(chunk.id),
        vector: embeddings[i],
        payload: {
          chunkId: chunk.id,
          chunkType: chunk.chunkType,
          source: chunk.source,
          title: chunk.title,
          tags: chunk.tags,
          text: chunk.text,
          meta: chunk.meta
        }
      });
    });
  }

  await qdrant.upsert(COLLECTION, {
    points
  })

  console.log(`✅ Embedded ${points.length} chunks into Qdrant collection '${COLLECTION}'`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  embedPortfolio().catch(console.error)
}
