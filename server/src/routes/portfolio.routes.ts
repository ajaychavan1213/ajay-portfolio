import { Router } from "express";
import { 
  createSkill, getSkills, updateSkill, deleteSkill,
  createExperience, getExperiences, updateExperience, deleteExperience,
  createEducation, getEducations, updateEducation, deleteEducation,
  createCertificate, getCertificates, updateCertificate, deleteCertificate,
  createService, getServices, updateService, deleteService,
  createTestimonial, getTestimonials, updateTestimonial, deleteTestimonial,
  getSyncData, saveSyncData
} from "../controllers/portfolio.controller";
import { protect, restrictTo } from "../middleware/auth";
import { validateBody } from "../middleware/validator";
import { skillSchema } from "../validators";

const router = Router();

const adminGuard = [protect, restrictTo("admin")];

// --- SKILLS ---
router.get("/skills", getSkills);
router.post("/skills", ...adminGuard, validateBody(skillSchema), createSkill);
router.put("/skills/:id", ...adminGuard, validateBody(skillSchema), updateSkill);
router.delete("/skills/:id", ...adminGuard, deleteSkill);

// --- EXPERIENCE ---
router.get("/experiences", getExperiences);
router.post("/experiences", ...adminGuard, createExperience);
router.put("/experiences/:id", ...adminGuard, updateExperience);
router.delete("/experiences/:id", ...adminGuard, deleteExperience);

// --- EDUCATION ---
router.get("/educations", getEducations);
router.post("/educations", ...adminGuard, createEducation);
router.put("/educations/:id", ...adminGuard, updateEducation);
router.delete("/educations/:id", ...adminGuard, deleteEducation);

// --- CERTIFICATES ---
router.get("/certificates", getCertificates);
router.post("/certificates", ...adminGuard, createCertificate);
router.put("/certificates/:id", ...adminGuard, updateCertificate);
router.delete("/certificates/:id", ...adminGuard, deleteCertificate);

// --- SERVICES ---
router.get("/services", getServices);
router.post("/services", ...adminGuard, createService);
router.put("/services/:id", ...adminGuard, updateService);
router.delete("/services/:id", ...adminGuard, deleteService);

// --- TESTIMONIALS ---
router.get("/testimonials", getTestimonials);
router.post("/testimonials", ...adminGuard, createTestimonial);
router.put("/testimonials/:id", ...adminGuard, updateTestimonial);
router.delete("/testimonials/:id", ...adminGuard, deleteTestimonial);

// --- SYNC DATA ROUTE ---
router.get("/portfolio/sync", getSyncData);
router.post("/portfolio/sync", saveSyncData);

export default router;
