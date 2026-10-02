import { Router } from "express";
import multer from "multer";
import { 
  submitContactForm, getMessages, markAsRead, deleteMessage 
} from "../controllers/contact.controller";
import { handleAIChat } from "../controllers/ai.controller";
import { getDashboardStats } from "../controllers/dashboard.controller";
import { uploadImage } from "../controllers/media.controller";
import { protect, restrictTo } from "../middleware/auth";
import { validateBody } from "../middleware/validator";
import { contactSchema } from "../validators";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const adminGuard = [protect, restrictTo("admin")];

// --- CONTACT FORM API ---
router.post("/contact", validateBody(contactSchema), submitContactForm);

// --- AI ASSISTANT API ---
router.post("/ai/chat", handleAIChat);

// --- ADMIN MESSAGES ENDPOINTS ---
router.get("/messages", ...adminGuard, getMessages);
router.patch("/messages/:id/read", ...adminGuard, markAsRead);
router.delete("/messages/:id", ...adminGuard, deleteMessage);

// --- ADMIN DASHBOARD STATS ---
router.get("/dashboard/stats", ...adminGuard, getDashboardStats);

// --- MEDIA FILE UPLOADS ---
router.post("/media/upload", ...adminGuard, upload.single("image"), uploadImage);

export default router;
