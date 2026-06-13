/**
 * Deletes the Qdrant collection for the current embedding provider.
 * Run with: npm run ingest:clean
 * Then follow with: npm run ingest
 */
import { QdrantClient } from "@qdrant/js-client-rest";
import { QDRANT_URL, QDRANT_API_KEY } from "../config/envConfig.js";
import { GenAIService } from "./rag/genai.service.js";

const qdrant = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  checkCompatibility: false,
});

const COLLECTION = GenAIService.getCollectionName();

console.log(`\n🗑️  Deleting Qdrant collection: '${COLLECTION}'...`);

try {
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some((c) => c.name === COLLECTION);

  if (!exists) {
    console.log(`⚠️  Collection '${COLLECTION}' does not exist. Nothing to delete.`);
  } else {
    await qdrant.deleteCollection(COLLECTION);
    console.log(`✅ Collection '${COLLECTION}' deleted successfully.`);
    console.log(`\n👉 Now run: npm run ingest\n`);
  }
} catch (err) {
  console.error(`❌ Failed to delete collection: ${err.message}`);
  process.exit(1);
}
