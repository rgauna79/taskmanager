import { Router } from "express";
import { login, register, logout } from "../controllers/auth.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
// router.get("/profile", authRequired, profile);
router.get("/verify", auth);

export default router;
