import { Router } from "express";
import profileRoutes from "./profile.routes.js";
import askRoutes from "./ask.routes.js";
import portfolioRoutes from "./portfolio.routes.js";
import codingPlatformsRoutes from "./codingPlatforms.routes.js";

const router = Router();

router.use("/", profileRoutes);
router.use("/", portfolioRoutes);
router.use("/ask", askRoutes);
router.use("/codingPlatforms", codingPlatformsRoutes);

export default router;
