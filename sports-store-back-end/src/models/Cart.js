import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    selectedSize: { type: String, trim: true, default: "" },
    unitPriceSnapshot: { type: Number, required: true, min: 0 },
    titleSnapshot: { type: String, required: true, trim: true },
    imageSnapshot: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

export const Cart = mongoose.models.Cart ?? mongoose.model("Cart", cartSchema);

export default Cart;
