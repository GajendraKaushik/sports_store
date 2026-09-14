import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import * as productController from "../controllers/product.controller.js";
import {
  productQuerySchema,
  productSlugSchema,
} from "../validators/product.validator.js";

const router = Router();

router.get(
  "/",
  validate(productQuerySchema, "query"),
  asyncHandler(productController.listProducts),
);

router.get("/facets", asyncHandler(productController.getFacets));

router.get(
  "/:slug",
  validate(productSlugSchema, "params"),
  asyncHandler(productController.getProductBySlug),
);

export default router;
