import { Router } from "express";
import { 
  createBlog, getBlogs, getBlogById, getBlogBySlug, updateBlog, deleteBlog 
} from "../controllers/blog.controller";
import { protect, restrictTo } from "../middleware/auth";
import { validateBody } from "../middleware/validator";
import { blogSchema } from "../validators";

const router = Router();

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.get("/slug/:slug", getBlogBySlug);

// Admin-only protected routes
router.post("/", protect, restrictTo("admin"), validateBody(blogSchema), createBlog);
router.put("/:id", protect, restrictTo("admin"), validateBody(blogSchema), updateBlog);
router.delete("/:id", protect, restrictTo("admin"), deleteBlog);

export default router;
