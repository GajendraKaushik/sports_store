import { z } from "zod";

export const productQuerySchema = z.object({
  category: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(24).optional().default(12),
  sort: z
    .enum(["featured", "newest", "price-asc", "price-desc"])
    .optional(),
});

export const productSlugSchema = z.object({
  slug: z.string().trim().min(1, "Product slug is required"),
});

export default { productQuerySchema, productSlugSchema };
