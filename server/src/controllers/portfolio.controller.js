import { catchAsyncErrors } from "../middlewares/index.js";
import FileStorageService from "../services/fileStorage.service.js";

/**
 * Express controller handler that retrieves the canonical portfolio data.
 * Reads data from the master portfolio JSON file using the FileStorageService.
 *
 * @route GET /api/portfolio
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Resolves when the response is sent.
 */
export const getPortfolio = catchAsyncErrors(async (req, res) => {
  const portfolioData = await FileStorageService.getPortfolioData();

  res.status(200).json({
    success: true,
    data: portfolioData,
  });
});
