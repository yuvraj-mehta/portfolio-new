import { catchAsyncErrors } from "../middlewares/index.js";
import FileStorageService from "../services/fileStorage.service.js";
import { runRagPipeline } from "../services/rag/index.js";

/**
 * Initialize/Update Portfolio Profile
 *
 * Flow:
 * 1. Request arrives with validated payload (AJV validation middleware)
 * 2. Controller saves validated data to file storage
 * 3. Triggers RAG pipeline: normalize → embed
 * 4. Returns success response
 *
 * @route POST /api/profile/init
 * @middleware validateSchema - AJV validation middleware
 */
export const initProfile = catchAsyncErrors(async (req, res) => {
  const validatedPayload = req.body;

  const saveResult = await FileStorageService.saveLatestPortfolio(validatedPayload);

  // Trigger RAG ingestion pipeline: normalize → embed
  await runRagPipeline();

  res.status(201).json({
    success: true,
    message: "Portfolio profile initialized and RAG index updated successfully",
    data: {
      savedAt: saveResult.savedAt,
      filePath: saveResult.filePath,
      profileMeta: validatedPayload?.meta || null,
      ragUpdated: true,
    },
  });
});
