import { z } from "zod";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const updateStoreSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    slug: z.string().trim().min(1).optional(),
    description: z.string().trim().optional(),
    contactEmail: z.string().trim().email().optional(),
    contactPhone: z.string().trim().optional(),
    address: z.string().trim().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

const productPayload = z.object({
  categoryId: z.string().trim().min(1, "Category id is required"),
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1).optional(),
  description: z.string().trim().optional().default(""),
  shortDescription: z.string().trim().optional().default(""),
  price: z.coerce.number().min(0, "Price must be >= 0"),
  compareAtPrice: z.coerce.number().min(0).optional(),
  currency: z.string().trim().optional().default("USD"),
  stockQuantity: z.coerce.number().int().min(0).optional().default(0),
  sizes: z.array(z.string().trim().min(1)).optional().default([]),
  images: z.array(z.string().trim().url("Image must be a URL")).optional().default([]),
  specifications: z.record(z.any()).optional().default({}),
  status: z.enum(["draft", "active", "archived"]).optional().default("draft"),
});

export const createProductSchema = productPayload;

export const updateProductSchema = productPayload.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field is required" },
);

export const ownerProductIdSchema = z.object({
  productId: z.string().trim().min(1, "Product id is required"),
});

export const ownerOrderIdSchema = z.object({
  orderId: z.string().trim().min(1, "Order id is required"),
});

export const ownerOrderStatusSchema = z.object({
  status: z.enum([
    "pending",
    "confirmed",
    "ready_for_pickup",
    "completed",
    "cancelled",
  ]),
});

export { slugify };

export default {
  updateStoreSchema,
  createProductSchema,
  updateProductSchema,
  ownerProductIdSchema,
  ownerOrderIdSchema,
  ownerOrderStatusSchema,
};
