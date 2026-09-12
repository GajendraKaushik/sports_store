import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import * as accountController from "../controllers/account.controller.js";
import * as orderController from "../controllers/order.controller.js";
import {
  addressIdSchema,
  bikeCreateSchema,
  createAddressSchema,
  profileUpdateSchema,
  updateAddressSchema,
  wheelCreateSchema,
  wishlistAddSchema,
  wishlistItemParamSchema,
} from "../validators/account.validator.js";
import { orderIdSchema } from "../validators/order.validator.js";

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

router.get("/wishlist", asyncHandler(accountController.getWishlist));
router.post(
  "/wishlist/items",
  validate(wishlistAddSchema),
  asyncHandler(accountController.addWishlistItem),
);
router.delete(
  "/wishlist/items/:productId",
  validate(wishlistItemParamSchema, "params"),
  asyncHandler(accountController.removeWishlistItem),
);

router.get("/bikes", asyncHandler(accountController.listBikes));
router.post(
  "/bikes",
  validate(bikeCreateSchema),
  asyncHandler(accountController.createBike),
);

router.get("/wheels", asyncHandler(accountController.listWheels));
router.post(
  "/wheels",
  validate(wheelCreateSchema),
  asyncHandler(accountController.createWheel),
);

router.get("/orders", asyncHandler(orderController.listUserOrders));
router.get(
  "/orders/:orderId",
  validate(orderIdSchema, "params"),
  asyncHandler(orderController.getUserOrder),
);

export default router;
