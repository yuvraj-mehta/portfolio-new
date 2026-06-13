import { SYSTEM_PROMPT } from "../../constants/systemPrompt.js";
import { GenAIService } from "./genai.service.js";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Generate an answer using retrieved context
 * @param {string} query
 * @param {Array<{text: string, title: string}>} contexts
 */
export async function generateAnswer(query, contexts) {
  const hasContext = contexts && contexts.length > 0;
  const contextText = hasContext
    ? contexts.map((c, i) => `(${i + 1}) [${c.title}]\n${c.text}`).join("\n\n")
    : "No specific portfolio information found for this query.";

  if (isDev) {
    console.log("=== RAG Debug ===");
    console.log("Query:", query);
    console.log("Contexts found:", contexts.length);

    if (hasContext) {
      console.log("\n--- Retrieved Chunks ---");
      contexts.forEach((chunk, i) => {
        console.log(`\nChunk ${i + 1}:`);
        console.log(`Title: ${chunk.title || 'N/A'}`);
        console.log(`Type: ${chunk.chunkType || 'N/A'}`);
        console.log(`Score: ${chunk.score || 'N/A'}`);
        console.log(`Text: ${chunk.text.substring(0, 200)}...`);
      });
      console.log("--- End Chunks ---\n");
    } else {
      console.log("No chunks retrieved from Qdrant");
    }

    console.log("System prompt length:", SYSTEM_PROMPT.length);
  }

  console.log(`Generating answer using provider '${GenAIService.getProvider()}' for model '${GenAIService.getChatModel()}'...`);
  const answer = await GenAIService.generateAnswer(query, SYSTEM_PROMPT, contextText);

  if (isDev) {
    console.log("LLM Response:", answer);
    console.log("=================");
  }

  return answer;
}
