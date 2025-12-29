import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config/envConfig.js";
import { SYSTEM_PROMPT } from "./systemPrompt.js";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

/**
 * Generate an answer using retrieved context
 * @param {string} query
 * @param {Array<{text: string, title: string}>} contexts
 */
export async function generateAnswer(query, contexts) {
  const hasContext = contexts && contexts.length > 0;
  const contextText = hasContext
    ? contexts.map((c, i) => `(${i + 1}) ${c.text}`).join("\n\n")
    : "No specific portfolio information found for this query.";

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

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: `
Context:
${contextText}

Question:
${query}
`
      }
    ],
    temperature: 0.7
  });

  const answer = response.choices[0].message.content;
  console.log("LLM Response:", answer);
  console.log("=================");

  return answer;
}