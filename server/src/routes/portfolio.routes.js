import { Router } from "express";
import { getPortfolio } from "../controllers/portfolio.controller.js";

const router = Router();

/**
 * GET /api/portfolio
 * Retrieve the canonical portfolio data
 */
router.get("/portfolio", getPortfolio);

export default router;
