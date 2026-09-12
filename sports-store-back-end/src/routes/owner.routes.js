import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ROLES } from "../constants/roles.js";
import * as ownerController from "../controllers/owner.controller.js";
import {
  createProductSchema,
  ownerOrderIdSchema,
  ownerOrderStatusSchema,
  ownerProductIdSchema,
  updateProductSchema,
  updateStoreSchema,
} from "../validators/owner.validator.js";

const router = Router();

router.use(requireAuth, requireRole(ROLES.OWNER));

router.get("/store", asyncHandler(ownerController.getStore));
router.patch(
  "/store",
  validate(updateStoreSchema),
  asyncHandler(ownerController.updateStore),
);

router.get("/products", asyncHandler(ownerController.listProducts));
router.post(
  "/products",
  validate(createProductSchema),
  asyncHandler(ownerController.createProduct),
);
router.patch(
  "/products/:productId",
  validate(ownerProductIdSchema, "params"),
  validate(updateProductSchema),
  asyncHandler(ownerController.updateProduct),
);

router.get("/dashboard", asyncHandler(ownerController.getDashboard));

router.get("/orders", asyncHandler(ownerController.listOrders));
router.patch(
  "/orders/:orderId/status",
  validate(ownerOrderIdSchema, "params"),
  validate(ownerOrderStatusSchema),
  asyncHandler(ownerController.updateOrderStatus),
);

export default router;
