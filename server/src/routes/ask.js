import express from "express";
import { askPortfolio } from "../rag/ask.js";
import { askRateLimiter } from "../middlewares/index.js";

const router = express.Router();

// Configuration for query limits
const QUERY_CONFIG = {
  minLength: 3,
  maxLength: 500,
};

router.post("/", askRateLimiter, async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: {
        code: "MISSING_QUERY",
        title: "Query Required",
        description: "Please provide a question or query.",
        suggestion: "Enter your question in the input field.",
      },
    });
  }

  // Trim and validate query length
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < QUERY_CONFIG.minLength) {
    return res.status(400).json({
      success: false,
      error: {
        code: "QUERY_TOO_SHORT",
        title: "Question Too Short",
        description: `Your question must be at least ${QUERY_CONFIG.minLength} characters long.`,
        details: {
          minLength: QUERY_CONFIG.minLength,
          currentLength: trimmedQuery.length,
          charsNeeded: QUERY_CONFIG.minLength - trimmedQuery.length,
        },
        suggestion: `Please write a more detailed question. You need ${QUERY_CONFIG.minLength - trimmedQuery.length} more character${QUERY_CONFIG.minLength - trimmedQuery.length > 1 ? 's' : ''}.`,
      },
    });
  }

  if (trimmedQuery.length > QUERY_CONFIG.maxLength) {
    return res.status(400).json({
      success: false,
      error: {
        code: "QUERY_TOO_LONG",
        title: "Question Too Long",
        description: `Your question exceeds the maximum limit of ${QUERY_CONFIG.maxLength} characters.`,
        details: {
          maxLength: QUERY_CONFIG.maxLength,
          currentLength: trimmedQuery.length,
          charsOverLimit: trimmedQuery.length - QUERY_CONFIG.maxLength,
        },
        suggestion: `Please shorten your question by ${trimmedQuery.length - QUERY_CONFIG.maxLength} character${trimmedQuery.length - QUERY_CONFIG.maxLength > 1 ? 's' : ''}.`,
      },
    });
  }

  try {
    const answer = await askPortfolio(trimmedQuery);
    res.json({ success: true, answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: {
        code: "PROCESSING_ERROR",
        title: "Unable to Process Question",
        description: "We encountered an error while processing your question.",
        suggestion: "Please try again in a moment.",
      },
    });
  }
});

export default router;
