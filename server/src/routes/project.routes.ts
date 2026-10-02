import { Router } from "express";
import { 
  createProject, getProjects, getProjectById, updateProject, deleteProject 
} from "../controllers/project.controller";
import { protect, restrictTo } from "../middleware/auth";
import { validateBody } from "../middleware/validator";
import { projectSchema } from "../validators";

const router = Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin-only protected routes
router.post("/", protect, restrictTo("admin"), validateBody(projectSchema), createProject);
router.put("/:id", protect, restrictTo("admin"), validateBody(projectSchema), updateProject);
router.delete("/:id", protect, restrictTo("admin"), deleteProject);

export default router;
