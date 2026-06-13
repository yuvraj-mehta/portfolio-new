import { AppError } from "../utils/AppError.js";

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

