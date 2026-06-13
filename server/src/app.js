import express from "express"
import cors from "cors"
import { ALLOWED_ORIGINS } from "./config/envConfig.js"
import apiRoutes from "./routes/index.js"
import { logger, errorHandler } from "./middlewares/index.js"

const app = express()

app.use(cors({
  origin: ALLOWED_ORIGINS,
  methods: ["GET", "POST"],
  credentials: false,
}))
app.use(express.json({ limit: "5mb" })) // IMPORTANT for large payload
app.use(logger) // Request logging

app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

// Unified API Routes
app.use("/api", apiRoutes)


// Global error handler (must be last)
app.use(errorHandler)

export default app
