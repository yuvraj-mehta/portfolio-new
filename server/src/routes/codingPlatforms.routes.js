import { Router } from "express";
import {
  getCodingStats,
  getLeetCodeStats,
  getCodeforcesStats,
  getCodeChefStats,
  getGFGStats
} from "../controllers/codingPlatforms.controller.js";

const router = Router();

/**
 * GET /api/codingPlatforms/all
 * Retrieve aggregated coding platform stats for all platforms.
 */
router.get("/all", getCodingStats);

/**
 * GET /api/codingPlatforms/leetcode
 * Retrieve coding platform stats for LeetCode.
 */
router.get("/leetcode", getLeetCodeStats);

/**
 * GET /api/codingPlatforms/codeforces
 * Retrieve coding platform stats for Codeforces.
 */
router.get("/codeforces", getCodeforcesStats);

/**
 * GET /api/codingPlatforms/codechef
 * Retrieve coding platform stats for CodeChef.
 */
router.get("/codechef", getCodeChefStats);

/**
 * GET /api/codingPlatforms/gfg
 * Retrieve coding platform stats for GeeksforGeeks.
 */
router.get("/gfg", getGFGStats);

export default router;
