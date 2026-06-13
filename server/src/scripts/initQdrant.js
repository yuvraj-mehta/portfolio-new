import { QdrantClient } from "@qdrant/js-client-rest"
import { QDRANT_URL, QDRANT_API_KEY } from "../config/envConfig.js"

const client = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  checkCompatibility: false
})

/**
 * Verifies if a Qdrant collection with the given name exists.
 * If the collection is missing, creates it with the default vector size of 3072
 * and Cosine distance metric.
 *
 * @param {string} name - Name of the collection to ensure exists.
 * @returns {Promise<void>} Resolves when the check/creation is complete.
 * @throws {Error} If checking or creating the collection fails.
 */
async function ensureCollection(name) {
  try {
    await client.getCollection(name)
    console.log(`ℹ️ Collection '${name}' already exists; skipping creation.`)
  } catch (err) {
    const msg = err?.data?.status?.error || err?.message || ""
    const isNotFound = err?.status === 404 || /Not found/i.test(msg)
    const isAlreadyExists = err?.status === 409 || /Already exists/i.test(msg)

    if (isAlreadyExists) {
      console.log(`ℹ️ Collection '${name}' already exists; skipping creation.`)
      return
    }

    if (isNotFound) {
      await client.createCollection(name, {
        vectors: {
          size: 3072, // OpenAI embedding size
          distance: "Cosine"
        }
      })
      console.log(`✅ Created collection '${name}'`)
      return
    }

    throw err
  }
}

/**
 * Main script entry point to initialize required Qdrant collections.
 * Insures the "portfolio_chunks" collection is set up.
 *
 * @returns {Promise<void>} Resolves when initialization succeeds.
 */
async function init() {
  await ensureCollection("portfolio_chunks")
}

init().catch(console.error)
