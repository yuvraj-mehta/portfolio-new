import { retrieveContext } from "./retrieve.service.js";
import { generateAnswer } from "./generate.service.js";

export async function askPortfolio(query) {
  let contexts = [];
  try {
    contexts = await retrieveContext(query, 5);
  } catch (err) {
    console.error("[askPortfolio] Retrieval failed:", err.message);
    // Fall through with empty context — LLM will respond with what it knows from system prompt
  }

  return await generateAnswer(query, contexts);
}
