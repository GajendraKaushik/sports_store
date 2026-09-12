import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import * as cartController from "../controllers/cart.controller.js";
import {
  addCartItemSchema,
  cartItemParamSchema,
  updateCartItemSchema,
} from "../validators/cart.validator.js";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(cartController.getCart));

router.post(
  "/items",
  validate(addCartItemSchema),
  asyncHandler(cartController.addItem),
);

router.patch(
  "/items/:productId",
  validate(cartItemParamSchema, "params"),
  validate(updateCartItemSchema),
  asyncHandler(cartController.updateItem),
);

router.delete(
  "/items/:productId",
  validate(cartItemParamSchema, "params"),
  asyncHandler(cartController.removeItem),
);

export default router;
