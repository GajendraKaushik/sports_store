import { AppError } from "../utils/app-error.js";
import { ORDER_STATUS } from "../constants/order-status.js";
import { Address } from "../models/Address.js";
import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
import { Store } from "../models/Store.js";
import { Product } from "../models/Product.js";

function toOrderPayload(order) {
  const raw = order.toObject ? order.toObject() : order;
  return {
    id: raw._id.toString(),
    items: (raw.items ?? []).map((item) => ({
      productId: item.productId?.toString?.() ?? item.productId,
      quantity: item.quantity,
      selectedSize: item.selectedSize ?? "",
      unitPrice: item.unitPrice,
      titleSnapshot: item.titleSnapshot,
      imageSnapshot: item.imageSnapshot ?? "",
      lineTotal: item.unitPrice * item.quantity,
    })),
    subtotal: raw.subtotal,
    fees: raw.fees,
    tax: raw.tax,
    total: raw.total,
    currency: raw.currency,
    status: raw.status,
    fulfillmentMethod: raw.fulfillmentMethod,
    createdAt: raw.createdAt,
  };
}

function snapshotAddress(address) {
  if (!address) return {};
  const raw = address.toObject ? address.toObject() : address;
  return {
    label: raw.label,
    type: raw.type,
    fullName: raw.fullName,
    line1: raw.line1,
    line2: raw.line2,
    city: raw.city,
    state: raw.state,
    postalCode: raw.postalCode,
    country: raw.country,
    phone: raw.phone ?? "",
  };
}

async function loadAddressOrNull(userId, addressId) {
  if (!addressId) return null;
  if (!/^[0-9a-fA-F]{24}$/.test(addressId)) {
    throw new AppError(400, "Invalid address id", "VALIDATION_ERROR");
  }
  const address = await Address.findOne({ _id: addressId, userId });
  if (!address) {
    throw new AppError(404, "Address not found", "NOT_FOUND");
  }
  return address;
}

async function resolveStoreIdForCart(cart) {
  // Single-store slice: derive the store from the first cart product.
  // Keeps Order.storeId (required) valid without multi-store checkout.
  const firstProductId = cart.items[0]?.productId;
  const product = await Product.findById(firstProductId).select("storeId");
  if (!product) {
    throw new AppError(404, "Product not found or unavailable", "NOT_FOUND");
  }
  return product.storeId;
}

export async function createOrderFromCart(
  userId,
  { fulfillmentMethod, shippingAddressId, billingAddressId },
) {
  const [cart, user] = await Promise.all([
    Cart.findOne({ userId }),
    User.findById(userId),
  ]);
  if (!user) throw new AppError(404, "User not found", "NOT_FOUND");
  if (!cart || cart.items.length === 0) {
    throw new AppError(400, "Cart is empty", "VALIDATION_ERROR");
  }

  const [shippingAddress, billingAddress] = await Promise.all([
    loadAddressOrNull(userId, shippingAddressId),
    loadAddressOrNull(userId, billingAddressId),
  ]);

  const storeId = await resolveStoreIdForCart(cart);
  const store = await Store.findById(storeId).select("_id");
  if (!store) {
    throw new AppError(404, "Store not found", "NOT_FOUND");
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.unitPriceSnapshot * item.quantity,
    0,
  );
  const fees = 0;
  const tax = 0;

  const order = await Order.create({
    userId,
    storeId: store._id,
    items: cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      selectedSize: item.selectedSize ?? "",
      unitPrice: item.unitPriceSnapshot,
      titleSnapshot: item.titleSnapshot,
      imageSnapshot: item.imageSnapshot ?? "",
    })),
    subtotal,
    fees,
    tax,
    total: subtotal + fees + tax,
    currency: "USD",
    status: ORDER_STATUS.PENDING,
    fulfillmentMethod: fulfillmentMethod ?? "pickup",
    shippingAddressSnapshot: snapshotAddress(shippingAddress),
    billingAddressSnapshot: snapshotAddress(billingAddress),
    customerSnapshot: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
    },
  });

  cart.items = [];
  await cart.save();

  return toOrderPayload(order);
}

export async function listUserOrders(userId) {
  const docs = await Order.find({ userId }).sort({ createdAt: -1 });
  return docs.map(toOrderPayload);
}

export async function getUserOrder(userId, orderId) {
  if (!/^[0-9a-fA-F]{24}$/.test(orderId)) {
    throw new AppError(404, "Order not found", "NOT_FOUND");
  }
  const order = await Order.findOne({ _id: orderId, userId });
  if (!order) throw new AppError(404, "Order not found", "NOT_FOUND");
  return toOrderPayload(order);
}

export default { createOrderFromCart, listUserOrders, getUserOrder };
