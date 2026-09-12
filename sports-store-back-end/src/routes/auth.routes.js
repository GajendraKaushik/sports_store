import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  loginSchema,
  signupSchema,
} from "../validators/auth.validator.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/signup",
  validate(signupSchema),
  asyncHandler(authController.signup),
);

router.post("/login", validate(loginSchema), asyncHandler(authController.login));

router.get("/me", requireAuth, asyncHandler(authController.me));

export default router;
