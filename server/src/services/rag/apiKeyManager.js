import { GEMINI_API_KEYS } from "../../config/envConfig.js";

/**
 * Manages a pool of Gemini API keys, handling rotation and rate-limit blocking.
 */
class ApiKeyManager {
  constructor() {
    this.keys = GEMINI_API_KEYS.map(key => ({
      key,
      blockedUntil: 0
    }));
    this.currentIndex = 0;
  }

  /**
   * Retrieves the next available (unblocked) API key using Round Robin.
   * If all keys are blocked, throws an error.
   * @returns {string} The active API key.
   */
  getKey() {
    if (this.keys.length === 0) {
      throw new Error("No Gemini API keys configured.");
    }

    const now = Date.now();
    const startIndex = this.currentIndex;

    do {
      const current = this.keys[this.currentIndex];
      if (now >= current.blockedUntil) {
        // Key is available
        const keyToReturn = current.key;
        // Move to the next index for the subsequent call (Round Robin distribution)
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;
        return keyToReturn;
      }

      // Move to the next key to check
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    } while (this.currentIndex !== startIndex);

    // If we loop all the way around and don't return, all keys are blocked
    throw new Error("All Gemini API keys are currently rate-limited. Please try again later.");
  }

  /**
   * Marks a specific key as rate-limited, blocking it for 15 minutes.
   * @param {string} keyToBlock - The API key string that received a 429 response.
   */
  markKeyRateLimited(keyToBlock) {
    const keyObj = this.keys.find(k => k.key === keyToBlock);
    if (keyObj) {
      const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
      keyObj.blockedUntil = Date.now() + BLOCK_DURATION_MS;
      console.warn(`[ApiKeyManager] Gemini API key starting with '${keyToBlock.substring(0, 5)}...' has been rate-limited. Blocked for 15 minutes.`);
    }
  }
}

export const apiKeyManager = new ApiKeyManager();
