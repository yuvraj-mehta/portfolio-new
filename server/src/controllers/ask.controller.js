import { catchAsyncErrors } from "../middlewares/index.js";
import { askPortfolio } from "../services/rag/index.js";

const QUERY_CONFIG = {
  minLength: 3,
  maxLength: 500,
};

export const askQuestion = catchAsyncErrors(async (req, res) => {
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
        suggestion: `Please write a more detailed question. You need ${QUERY_CONFIG.minLength - trimmedQuery.length} more character${QUERY_CONFIG.minLength - trimmedQuery.length > 1 ? "s" : ""}.`,
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
        suggestion: `Please shorten your question by ${trimmedQuery.length - QUERY_CONFIG.maxLength} character${trimmedQuery.length - QUERY_CONFIG.maxLength > 1 ? "s" : ""}.`,
      },
    });
  }

  const answer = await askPortfolio(trimmedQuery);
  res.json({ success: true, answer });
});
