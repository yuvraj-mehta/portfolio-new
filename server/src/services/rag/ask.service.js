import { retrieveContext } from "./retrieve.service.js";
import { generateAnswer } from "./generate.service.js";

export async function askPortfolio(query) {
  const contexts = await retrieveContext(query, 5);

  // Always pass to LLM - even with empty context, the system prompt will handle it appropriately
  return await generateAnswer(query, contexts);
}
