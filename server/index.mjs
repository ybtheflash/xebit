import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env.local") });

const app = express();

import { getAppwriteConfig } from "../lib/appwrite.mjs";

const { databases, DATABASE_ID, USERS_COLLECTION_ID } = getAppwriteConfig();

import authRoutes from "./routes/auth.mjs";
import userRoutes from "./routes/user.mjs";
// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Use routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5001;

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err.message);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
