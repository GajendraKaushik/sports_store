import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    label: { type: String, trim: true, default: "" },
    type: {
      type: String,
      enum: ["shipping", "billing"],
      default: "shipping",
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true, default: "" },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true, default: "" },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, trim: true, default: "USA" },
    phone: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Address =
  mongoose.models.Address ?? mongoose.model("Address", addressSchema);

export default Address;
