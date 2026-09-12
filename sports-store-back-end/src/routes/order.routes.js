import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import * as orderController from "../controllers/order.controller.js";
import { createOrderSchema } from "../validators/order.validator.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/",
  validate(createOrderSchema),
  asyncHandler(orderController.createOrder),
);

export default router;
