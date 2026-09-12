import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: { status: "ok" },
  });
});

router.use("/auth", authRoutes);

export default router;

