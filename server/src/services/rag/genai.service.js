import OpenAI from "openai";
import {
  GENAI_PROVIDER,
  OPENAI_API_KEY,
  GEMINI_API_KEY,
  EMBEDDING_MODEL,
  CHAT_MODEL
} from "../../config/envConfig.js";

// Initialize OpenAI client if using OpenAI provider
let openai = null;
if (GENAI_PROVIDER === "openai") {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  });
}

/**
 * GenAIService.
 * Handles AI orchestration, including vector embeddings generation and chat completions
 * using either OpenAI or Google Gemini REST API providers.
 *
 * @class GenAIService
 */
export class GenAIService {
  /**
   * Retrieves the configured GenAI provider name.
   *
   * @static
   * @returns {string} The active provider string (e.g. 'openai' or 'gemini').
   */
  static getProvider() {
    return GENAI_PROVIDER;
  }

  /**
   * Retrieves the embedding model name.
   *
   * @static
   * @returns {string} The configured embedding model name.
   */
  static getEmbeddingModel() {
    return EMBEDDING_MODEL;
  }

  /**
   * Retrieves the active chat/generation model name.
   *
   * @static
   * @returns {string} The configured chat/generation model name.
   */
  static getChatModel() {
    return CHAT_MODEL;
  }

  /**
   * Retrieves the vector dimension size associated with the active embedding model.
   *
   * @static
   * @returns {number} The expected vector dimension size (e.g. 3072).
   */
  static getVectorSize() {
    if (GENAI_PROVIDER === "gemini") {
      return 3072; // default size for gemini-embedding-001
    }
    return 3072; // default size for text-embedding-3-large
  }

  /**
   * Determines the Qdrant database collection name based on the current provider.
   *
   * @static
   * @returns {string} The formatted Qdrant collection name.
   */
  static getCollectionName() {
    return `portfolio_chunks_${GENAI_PROVIDER}`;
  }

  /**
   * Generates high-dimensional vector embeddings for a given batch of text inputs.
   * Uses the provider-specific SDK or REST endpoints depending on the configuration.
   *
   * @static
   * @async
   * @param {string[]} texts - An array of text strings to generate embeddings for.
   * @returns {Promise<number[][]>} Resolves with a matrix of embeddings, where each row is a number array of dimensions matching the model's vector size.
   * @throws {Error} If the provider is unsupported or the API request fails.
   */
  static async generateEmbeddings(texts) {
    if (GENAI_PROVIDER === "openai") {
      const response = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: texts
      });
      return response.data.map(d => d.embedding);
    } else if (GENAI_PROVIDER === "gemini") {
      // Use Google Generative Language REST API batchEmbedContents
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:batchEmbedContents?key=${GEMINI_API_KEY}`;
      
      const requests = texts.map(text => ({
        model: `models/${EMBEDDING_MODEL}`,
        content: {
          parts: [{ text }]
        }
      }));

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requests })
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Gemini Embedding API error: Status ${res.status} - ${errBody}`);
      }

      const json = await res.json();
      if (!json.embeddings || json.embeddings.length !== texts.length) {
        throw new Error("Gemini Embedding API response does not match input size");
      }

      return json.embeddings.map(e => e.values);
    } else {
      throw new Error(`Unsupported GenAI provider: ${GENAI_PROVIDER}`);
    }
  }

  /**
   * Generates a conversational text answer by combining the user's question,
   * system instructions, and retrieved context segments.
   *
   * @static
   * @async
   * @param {string} query - The trimmed user query or question.
   * @param {string} systemPrompt - The system prompt specifying rules and behavioral constraints.
   * @param {string} contextText - Formatted RAG document context extracted from Qdrant database.
   * @returns {Promise<string>} Resolves with the generated text answer.
   * @throws {Error} If the API request fails or the response from the provider is empty/invalid.
   */
  static async generateAnswer(query, systemPrompt, contextText) {
    if (GENAI_PROVIDER === "openai") {
      const response = await openai.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Context:\n${contextText}\n\nQuestion:\n${query}`
          }
        ],
        temperature: 0.7
      });
      return response.choices[0].message.content;
    } else if (GENAI_PROVIDER === "gemini") {
      // Use Google Generative Language REST API generateContent
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${CHAT_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
      
      // Construct prompt including system instructions as per Gemini API format
      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Context:\n${contextText}\n\nQuestion:\n${query}`
              }
            ]
          }
        ],
        systemInstruction: {
          parts: [
            { text: systemPrompt }
          ]
        },
        generationConfig: {
          temperature: 0.7
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Gemini Chat API error: Status ${res.status} - ${errBody}`);
      }

      const json = await res.json();
      const answer = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!answer) {
        throw new Error(`Invalid or empty response from Gemini Chat API: ${JSON.stringify(json)}`);
      }

      return answer;
    } else {
      throw new Error(`Unsupported GenAI provider: ${GENAI_PROVIDER}`);
    }
  }
}

export default GenAIService;
