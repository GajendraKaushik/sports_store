import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import * as accountController from "../controllers/account.controller.js";
import {
  addressIdSchema,
  createAddressSchema,
  profileUpdateSchema,
  updateAddressSchema,
} from "../validators/account.validator.js";

const router = Router();

router.use(requireAuth);

router.get("/profile", asyncHandler(accountController.getProfile));
router.patch(
  "/profile",
  validate(profileUpdateSchema),
  asyncHandler(accountController.updateProfile),
);

router.get("/addresses", asyncHandler(accountController.listAddresses));
router.post(
  "/addresses",
  validate(createAddressSchema),
  asyncHandler(accountController.createAddress),
);
router.patch(
  "/addresses/:addressId",
  validate(addressIdSchema, "params"),
  validate(updateAddressSchema),
  asyncHandler(accountController.updateAddress),
);
router.delete(
  "/addresses/:addressId",
  validate(addressIdSchema, "params"),
  asyncHandler(accountController.deleteAddress),
);

export default router;
