import dotenv from "dotenv";
import path from "path";

// Load environment variables before importing app
dotenv.config({ path: path.join(__dirname, "../.env") });

import app from "./app";
import { connectDB } from "./config/db";
import { configureCloudinary } from "./config/cloudinary";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  // 1. Establish database connection
  await connectDB();

  // 2. Setup Cloudinary config credentials
  configureCloudinary();

  // 3. Bind server listener
  const server = app.listen(PORT, () => {
    console.log(`⚡ [server]: Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
  });

  // Handle unhandled promise rejections globally
  process.on("unhandledRejection", (err: any) => {
    console.error(`❌ Unhandled Rejection Error: ${err.message || err}`);
    // Gracefully shut down server
    server.close(() => process.exit(1));
  });

  // Handle uncaught exceptions globally
  process.on("uncaughtException", (err: any) => {
    console.error(`❌ Uncaught Exception Error: ${err.message || err}`);
    process.exit(1);
  });
}

bootstrap().catch((error) => {
  console.error("❌ Bootstrapping server failed:", error);
});
