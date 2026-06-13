import { catchAsyncErrors } from "../middlewares/index.js";
import FileStorageService from "../services/fileStorage.service.js";

/**
 * Get Canonical Portfolio Data
 * @route GET /api/portfolio
 */
export const getPortfolio = catchAsyncErrors(async (req, res) => {
  const portfolioData = await FileStorageService.getPortfolioData();

  res.status(200).json({
    success: true,
    data: portfolioData,
  });
});
