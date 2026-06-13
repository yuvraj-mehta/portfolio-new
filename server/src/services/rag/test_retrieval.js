/**
 * Manual retrieval test — run with:
 *   npm run test:retrieval
 *
 * Tests the full embed→search pipeline and prints raw scores + content
 * to help diagnose threshold and retrieval issues.
 */
import { QdrantClient } from "@qdrant/js-client-rest";
import { GenAIService } from "./genai.service.js";
import { QDRANT_URL, QDRANT_API_KEY } from "../../config/envConfig.js";

const qdrant = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  checkCompatibility: false,
});

const TEST_QUERIES = [
  "tell me about your projects",
  "what is BookHive",
  "your skills and tech stack",
  "competitive programming achievements",
];

const COLLECTION = GenAIService.getCollectionName();
const TOP_K = 5;

console.log("\n========================================");
console.log("  RAG Retrieval Diagnostic Test");
console.log("========================================");
console.log(`Provider    : ${GenAIService.getProvider()}`);
console.log(`Model       : ${GenAIService.getEmbeddingModel()}`);
console.log(`Collection  : ${COLLECTION}`);
console.log(`Top-K       : ${TOP_K}`);
console.log("========================================\n");

// Verify collection exists and has points
try {
  const info = await qdrant.getCollection(COLLECTION);
  const pointCount =
    info?.points_count ??
    info?.result?.points_count ??
    "unknown";
  console.log(`✅ Collection '${COLLECTION}' found — ${pointCount} points\n`);
} catch (err) {
  console.error(`❌ Collection error: ${err.message}`);
  process.exit(1);
}

// Run each test query
for (const query of TEST_QUERIES) {
  console.log(`\n${"─".repeat(50)}`);
  console.log(`Query: "${query}"`);
  console.log(`${"─".repeat(50)}`);

  let queryVector;
  try {
    console.log("  Embedding query...");
    const embeddings = await GenAIService.generateEmbeddings([query]);
    queryVector = embeddings[0];
    console.log(`  ✅ Embedded — vector length: ${queryVector.length}`);
  } catch (err) {
    console.error(`  ❌ Embedding failed: ${err.message}`);
    continue;
  }

  let results;
  try {
    results = await qdrant.search(COLLECTION, {
      vector: queryVector,
      limit: TOP_K,
      with_payload: true,
    });
  } catch (err) {
    console.error(`  ❌ Qdrant search failed: ${err.message}`);
    continue;
  }

  if (results.length === 0) {
    console.log("  ⚠️  No results returned from Qdrant at all");
    continue;
  }

  console.log(`\n  Results (${results.length} hits, no threshold filter):`);
  results.forEach((r, i) => {
    console.log(`\n  [${i + 1}] Score: ${r.score.toFixed(4)}`);
    console.log(`       Type : ${r.payload?.chunkType ?? "N/A"}`);
    console.log(`       Title: ${r.payload?.title ?? "N/A"}`);
    console.log(`       Text : ${(r.payload?.text ?? "").substring(0, 150).replace(/\n/g, " ")}...`);
  });
}

console.log(`\n${"═".repeat(50)}`);
console.log("Test complete.");
console.log(
  "\n💡 Tip: If scores are all below 0.35, lower SCORE_THRESHOLD in retrieve.service.js"
);
console.log(`${"═".repeat(50)}\n`);
