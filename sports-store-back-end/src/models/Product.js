import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, trim: true, default: "" },
    shortDescription: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    currency: { type: String, uppercase: true, trim: true, default: "USD" },
    stockQuantity: { type: Number, default: 0, min: 0 },
    sizes: { type: [String], default: [] },
    images: { type: [String], default: [] },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);

export default Product;
