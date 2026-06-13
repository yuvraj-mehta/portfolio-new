import { AppError } from "../utils/AppError.js";

/**
 * Global Express error handling middleware.
 * Formats errors and sends a unified error response to the client.
 *
 * @param {Error|AppError} err - The error object thrown or passed down the middleware chain.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 * @returns {void}
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof AppError)) {
    const status = error.status || error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const code = error.type === "entity.parse.failed" ? "INVALID_JSON" : "INTERNAL_ERROR";
    error = new AppError(message, status, code);
  }

  console.error(`[Error] ${error.status} - ${error.code}: ${error.message}`, err);

  res.status(error.status).json({
    success: false,
    error: {
      code: error.code,
      title: "Error",
      description: error.message,
      details: error.details,
    },
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

