import app from "./app.js"
import { PORT } from "./config/envConfig.js"

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})