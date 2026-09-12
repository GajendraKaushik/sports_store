import { z } from "zod";

export const addCartItemSchema = z.object({
  productId: z.string().trim().min(1, "Product id is required"),
  quantity: z.coerce.number().int().min(1).optional().default(1),
  selectedSize: z.string().trim().optional().default(""),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
});

export const cartItemParamSchema = z.object({
  productId: z.string().trim().min(1, "Product id is required"),
});

export default { addCartItemSchema, updateCartItemSchema, cartItemParamSchema };
