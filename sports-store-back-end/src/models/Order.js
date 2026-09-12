import mongoose from "mongoose";
import { ORDER_STATUS, ORDER_STATUS_VALUES } from "../constants/order-status.js";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    selectedSize: { type: String, trim: true, default: "" },
    unitPrice: { type: Number, required: true, min: 0 },
    titleSnapshot: { type: String, required: true, trim: true },
    imageSnapshot: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },
    items: { type: [orderItemSchema], required: true, default: [] },
    subtotal: { type: Number, required: true, min: 0, default: 0 },
    fees: { type: Number, min: 0, default: 0 },
    tax: { type: Number, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0, default: 0 },
    currency: { type: String, uppercase: true, trim: true, default: "USD" },
    status: {
      type: String,
      enum: ORDER_STATUS_VALUES,
      default: ORDER_STATUS.PENDING,
      index: true,
    },
    fulfillmentMethod: { type: String, trim: true, default: "pickup" },
    shippingAddressSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    billingAddressSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    customerSnapshot: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

orderSchema.index({ createdAt: 1 });

export const Order =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);

export default Order;
