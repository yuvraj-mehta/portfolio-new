import { catchAsyncErrors } from "../middlewares/index.js";
import { askPortfolio } from "../services/rag/index.js";
import { AppError } from "../utils/AppError.js";

const QUERY_CONFIG = {
  minLength: 3,
  maxLength: 500,
};

/**
 * Express controller handler for answering portfolio questions.
 * Validates that the input query is present and within configured length limits (3 to 500 characters),
 * calls the RAG service to obtain an answer, and returns a JSON response.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @throws {AppError} 400 - If the query is missing, too short, or too long.
 * @returns {Promise<void>} Resolves when response is sent.
 */
export const askQuestion = catchAsyncErrors(async (req, res) => {
  const { query } = req.body;

  if (!query) {
    throw new AppError(
      "Please provide a question or query.",
      400,
      "MISSING_QUERY",
      { suggestion: "Enter your question in the input field." }
    );
  }

  const trimmedQuery = query.trim();

  if (trimmedQuery.length < QUERY_CONFIG.minLength) {
    const charsNeeded = QUERY_CONFIG.minLength - trimmedQuery.length;
    throw new AppError(
      `Your question must be at least ${QUERY_CONFIG.minLength} characters long.`,
      400,
      "QUERY_TOO_SHORT",
      {
        minLength: QUERY_CONFIG.minLength,
        currentLength: trimmedQuery.length,
        charsNeeded,
        suggestion: `Please write a more detailed question. You need ${charsNeeded} more character${charsNeeded > 1 ? "s" : ""}.`,
      }
    );
  }

  if (trimmedQuery.length > QUERY_CONFIG.maxLength) {
    const charsOverLimit = trimmedQuery.length - QUERY_CONFIG.maxLength;
    throw new AppError(
      `Your question exceeds the maximum limit of ${QUERY_CONFIG.maxLength} characters.`,
      400,
      "QUERY_TOO_LONG",
      {
        maxLength: QUERY_CONFIG.maxLength,
        currentLength: trimmedQuery.length,
        charsOverLimit,
        suggestion: `Please shorten your question by ${charsOverLimit} character${charsOverLimit > 1 ? "s" : ""}.`,
      }
    );
  }

  const answer = await askPortfolio(trimmedQuery);
  res.json({ success: true, answer });
});

