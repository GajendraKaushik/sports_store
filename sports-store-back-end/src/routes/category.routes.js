import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import * as productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", asyncHandler(productController.listCategories));

export default router;
