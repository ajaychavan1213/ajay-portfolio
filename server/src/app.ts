import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { globalErrorHandler } from "./middleware/errorHandler";
import { globalLimiter } from "./middleware/rateLimiter";

// Route imports
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import blogRoutes from "./routes/blog.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import contactRoutes from "./routes/contact.routes";

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: "*", // Adjust origins in production
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api", globalLimiter); // Apply rate limiting

// Request Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Version 1 Routes Setup
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1", portfolioRoutes); // Mount /skills, /experiences, etc.
app.use("/api/v1", contactRoutes); // Mount /contact, /ai/chat, /messages, /dashboard/stats, /media/upload

// Fallback Route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route node not found: ${req.originalUrl}`,
    data: null,
    errors: null
  });
});

// Express Global Error Handler Middleware
app.use(globalErrorHandler);

export default app;
