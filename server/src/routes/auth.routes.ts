import { Router } from "express";
import { register, login, refresh, logout } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validator";
import { registerSchema, loginSchema } from "../validators";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
