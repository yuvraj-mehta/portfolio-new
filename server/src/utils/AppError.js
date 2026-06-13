/**
 * Custom application error class extending the native JavaScript Error.
 * Used to define operational errors with custom HTTP status codes, error codes,
 * and contextual details for API responses.
 *
 * @class AppError
 * @extends {Error}
 */
export class AppError extends Error {
  /**
   * Creates an instance of AppError.
   *
   * @param {string} message - The error message description.
   * @param {number} [status=500] - The HTTP status code (e.g., 400, 404, 500).
   * @param {string} [code="INTERNAL_ERROR"] - A string key representing the error code.
   * @param {Object|null} [details=null] - Additional diagnostic details or contextual information.
   */
  constructor(message, status = 500, code = "INTERNAL_ERROR", details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
