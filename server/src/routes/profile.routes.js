import { Router } from "express";
import { initProfile } from "../controllers/profile.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const router = Router();

/**
 * POST /api/profile/init
 * Initialize or update the portfolio profile and re-index RAG
 */
router.post("/profile/init", validateSchema, initProfile);

export default router;
