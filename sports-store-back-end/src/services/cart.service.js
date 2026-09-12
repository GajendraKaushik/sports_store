import { AppError } from "../utils/app-error.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

function toCartPayload(cart) {
  const raw = cart.toObject ? cart.toObject() : cart;
  const items = (raw.items ?? []).map((item) => ({
    productId: item.productId?.toString?.() ?? item.productId,
    quantity: item.quantity,
    selectedSize: item.selectedSize ?? "",
    unitPriceSnapshot: item.unitPriceSnapshot,
    titleSnapshot: item.titleSnapshot,
    imageSnapshot: item.imageSnapshot ?? null,
    lineTotal: item.unitPriceSnapshot * item.quantity,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return {
    id: raw._id.toString(),
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
  };
}

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
}

async function loadActiveProduct(productId) {
  const product = await Product.findById(productId);
  if (!product || product.status !== "active") {
    throw new AppError(404, "Product not found or unavailable", "NOT_FOUND");
  }
  return product;
}

function snapshotFrom(product) {
  return {
    unitPriceSnapshot: product.price,
    titleSnapshot: product.title,
    imageSnapshot: product.images?.[0] ?? "",
  };
}

export async function getCart(userId) {
  const cart = await getOrCreateCart(userId);
  return toCartPayload(cart);
}

export async function addItem(userId, { productId, quantity, selectedSize }) {
  const product = await loadActiveProduct(productId);
  const cart = await getOrCreateCart(userId);

  const existing = cart.items.find(
    (item) =>
      item.productId.toString() === product._id.toString() &&
      (item.selectedSize ?? "") === (selectedSize ?? ""),
  );

  if (existing) {
    existing.quantity += quantity;
    Object.assign(existing, snapshotFrom(product));
  } else {
    cart.items.push({
      productId: product._id,
      quantity,
      selectedSize: selectedSize ?? "",
      ...snapshotFrom(product),
    });
  }

  await cart.save();
  return toCartPayload(cart);
}

export async function updateItem(userId, productId, { quantity }) {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.find(
    (entry) => entry.productId.toString() === productId.toString(),
  );
  if (!item) {
    throw new AppError(404, "Cart item not found", "NOT_FOUND");
  }
  item.quantity = quantity;
  await cart.save();
  return toCartPayload(cart);
}

export async function removeItem(userId, productId) {
  const cart = await getOrCreateCart(userId);
  const before = cart.items.length;
  cart.items = cart.items.filter(
    (entry) => entry.productId.toString() !== productId.toString(),
  );
  if (cart.items.length === before) {
    throw new AppError(404, "Cart item not found", "NOT_FOUND");
  }
  await cart.save();
  return toCartPayload(cart);
}

export default { getCart, addItem, updateItem, removeItem };
