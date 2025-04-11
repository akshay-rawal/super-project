import dotenv from "dotenv";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";

// Re-create __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Load .env file from one level above
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app.js";

import mongoDbConnect from "./db/connect.db.js";

app.use(
  cors({
    origin: process.env.BASE_URL,
    method: ["GET", "POST", "DELETE", "PUT"], //common method
    credential: true,
    allowedHeaders: ["content-type", "Authorization"],
  })
);

console.log(process.env.MONGO_URL);
const PORT = process.env.PORT || 8000;

mongoDbConnect()
  .then(() => {
    app.listen(PORT, () => console.log(`server is running on port:${PORT}`));
  })
  .catch((error) => {
    console.error("mongoDB connection failed", error);
  });
