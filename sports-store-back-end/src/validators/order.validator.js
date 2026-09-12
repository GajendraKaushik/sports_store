import { z } from "zod";

export const createOrderSchema = z.object({
  fulfillmentMethod: z
    .enum(["pickup", "delivery"])
    .optional()
    .default("pickup"),
  shippingAddressId: z.string().trim().optional().default(""),
  billingAddressId: z.string().trim().optional().default(""),
});

export const orderIdSchema = z.object({
  orderId: z.string().trim().min(1, "Order id is required"),
});

export default { createOrderSchema, orderIdSchema };
