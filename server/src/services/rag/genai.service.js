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

export class GenAIService {
  static getProvider() {
    return GENAI_PROVIDER;
  }

  static getEmbeddingModel() {
    return EMBEDDING_MODEL;
  }

  static getChatModel() {
    return CHAT_MODEL;
  }

  static getVectorSize() {
    if (GENAI_PROVIDER === "gemini") {
      return 3072; // default size for gemini-embedding-001
    }
    return 3072; // default size for text-embedding-3-large
  }

  static getCollectionName() {
    return `portfolio_chunks_${GENAI_PROVIDER}`;
  }

  /**
   * Generate vector embeddings for a list of texts
   * @param {string[]} texts
   * @returns {Promise<number[][]>} Array of embedding vectors
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
   * Generate text answer using model & prompt context
   * @param {string} query
   * @param {string} systemPrompt
   * @param {string} contextText
   * @returns {Promise<string>} Model answer string
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
