import Ajv from "ajv";
import addFormats from "ajv-formats";
import portfolioSchema from "../schema/portfolio.schema.json" with { type: "json" };

const ajv = new Ajv({ allErrors: true, coerceTypes: true });
addFormats(ajv);

const validatePayload = ajv.compile(portfolioSchema);

/**
 * AJV Schema Validation Middleware.
 * Validates the request body against the predefined portfolio JSON schema.
 * If the validation fails, it aborts the request chain and returns a 400 error status
 * with descriptive messages pointing out which fields failed validation.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 * @returns {void|import("express").Response} Calls next() if payload is valid, or returns 400 JSON response on validation failure.
 */
export const validateSchema = (req, res, next) => {
  const isValid = validatePayload(req.body);

  if (!isValid) {
    const errors = validatePayload.errors.map((error) => ({
      field: error.dataPath || error.instancePath || "root",
      message: error.message,
      keyword: error.keyword,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Validation passed, proceed to next middleware/controller
  next();
};

export default validateSchema;
