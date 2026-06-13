import { Router } from "express";
import { askQuestion } from "../controllers/ask.controller.js";
import { askRateLimiter } from "../middlewares/index.js";

const router = Router();

router.post("/", askRateLimiter, askQuestion);

export default router;
