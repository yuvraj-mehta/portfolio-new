import { catchAsyncErrors } from "../middlewares/index.js";
import FileStorageService from "../services/fileStorage.service.js";
import { runRagPipeline } from "../services/rag/index.js";

/**
 * Express controller handler to initialize or update the portfolio profile.
 * Saves the validated portfolio data payload to the filesystem using the FileStorageService.
 *
 * Flow:
 * 1. Request arrives with validated payload (AJV validation middleware)
 * 2. Controller saves validated data to file storage
 * 3. Returns success response
 *
 * @route POST /api/profile/init
 * @middleware validateSchema - AJV validation middleware
 * @param {import("express").Request} req - Express request object containing the validated portfolio body.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
export const initProfile = catchAsyncErrors(async (req, res) => {
  const validatedPayload = req.body;

  const saveResult = await FileStorageService.saveLatestPortfolio(validatedPayload);

  res.status(201).json({
    success: true,
    message: "Portfolio profile initialized successfully",
    data: {
      savedAt: saveResult.savedAt,
      filePath: saveResult.filePath,
      profileMeta: validatedPayload?.meta || null,
      ragUpdated: false,
    },
  });
});
