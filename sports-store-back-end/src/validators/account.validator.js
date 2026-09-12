import { z } from "zod";

const addressPayload = z.object({
  label: z.string().trim().optional().default(""),
  type: z.enum(["shipping", "billing"]).optional().default("shipping"),
  fullName: z.string().trim().min(1, "Full name is required"),
  line1: z.string().trim().min(1, "Address line 1 is required"),
  line2: z.string().trim().optional().default(""),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().optional().default(""),
  postalCode: z.string().trim().min(1, "Postal code is required"),
  country: z.string().trim().optional().default("USA"),
  phone: z.string().trim().optional().default(""),
  isDefault: z.boolean().optional().default(false),
});

export const profileUpdateSchema = z
  .object({
    firstName: z.string().trim().min(1).optional(),
    lastName: z.string().trim().min(1).optional(),
    phone: z.string().trim().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const createAddressSchema = addressPayload;

export const updateAddressSchema = addressPayload.partial();

export const addressIdSchema = z.object({
  addressId: z.string().trim().min(1, "Address id is required"),
});

export default {
  profileUpdateSchema,
  createAddressSchema,
  updateAddressSchema,
  addressIdSchema,
};
