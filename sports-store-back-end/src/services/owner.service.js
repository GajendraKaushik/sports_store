import { AppError } from "../utils/app-error.js";
import { ORDER_STATUS, ORDER_STATUS_VALUES } from "../constants/order-status.js";
import { Category } from "../models/Category.js";
import { Store } from "../models/Store.js";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { slugify } from "../validators/owner.validator.js";

function toStorePayload(store) {
  const raw = store.toObject ? store.toObject() : store;
  return {
    id: raw._id.toString(),
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? "",
    contactEmail: raw.contactEmail ?? "",
    contactPhone: raw.contactPhone ?? "",
    address: raw.address ?? "",
    isActive: raw.isActive,
  };
}

function toOwnerProductPayload(product) {
  const raw = product.toObject ? product.toObject() : product;
  return {
    id: raw._id.toString(),
    title: raw.title,
    slug: raw.slug,
    price: raw.price,
    compareAtPrice: raw.compareAtPrice ?? null,
    currency: raw.currency,
    stockQuantity: raw.stockQuantity,
    sizes: raw.sizes ?? [],
    images: raw.images ?? [],
    specifications: raw.specifications ?? {},
    status: raw.status,
    categoryId: raw.categoryId?.toString?.() ?? raw.categoryId,
  };
}

function toOwnerOrderPayload(order) {
  const raw = order.toObject ? order.toObject() : order;
  return {
    id: raw._id.toString(),
    userId: raw.userId?.toString?.() ?? raw.userId,
    items: (raw.items ?? []).map((item) => ({
      productId: item.productId?.toString?.() ?? item.productId,
      quantity: item.quantity,
      selectedSize: item.selectedSize ?? "",
      unitPrice: item.unitPrice,
      titleSnapshot: item.titleSnapshot,
    })),
    subtotal: raw.subtotal,
    total: raw.total,
    currency: raw.currency,
    status: raw.status,
    fulfillmentMethod: raw.fulfillmentMethod,
    createdAt: raw.createdAt,
  };
}

async function requireOwnerStore(ownerId) {
  const store = await Store.findOne({ ownerId });
  if (!store) {
    throw new AppError(404, "Owner store not found", "NOT_FOUND");
  }
  return store;
}

function isObjectId(value) {
  return /^[0-9a-fA-F]{24}$/.test(value ?? "");
}

function invalidIdError(label = "Invalid id") {
  return new AppError(400, label, "VALIDATION_ERROR");
}

export async function getStore(ownerId) {
  const store = await requireOwnerStore(ownerId);
  return toStorePayload(store);
}

export async function updateStore(ownerId, patch) {
  if (patch.slug) patch.slug = slugify(patch.slug);
  try {
    const store = await Store.findOneAndUpdate(
      { ownerId },
      { $set: patch },
      { new: true },
    );
    if (!store) throw new AppError(404, "Owner store not found", "NOT_FOUND");
    return toStorePayload(store);
  } catch (err) {
    if (err?.code === 11000) {
      throw new AppError(409, "Store slug already exists", "CONFLICT");
    }
    throw err;
  }
}

export async function listOwnerProducts(ownerId) {
  const store = await requireOwnerStore(ownerId);
  const docs = await Product.find({ storeId: store._id }).sort({
    createdAt: -1,
  });
  return docs.map(toOwnerProductPayload);
}

export async function createOwnerProduct(ownerId, payload) {
  const store = await requireOwnerStore(ownerId);
  if (!isObjectId(payload.categoryId)) {
    throw invalidIdError("Invalid category id");
  }
  const category = await Category.findById(payload.categoryId);
  if (!category) throw new AppError(404, "Category not found", "NOT_FOUND");

  const slug = slugify(payload.slug ?? payload.title);
  if (!slug) throw invalidIdError("Invalid product slug");
  try {
    const doc = await Product.create({ ...payload, slug, storeId: store._id });
    return toOwnerProductPayload(doc);
  } catch (err) {
    if (err?.code === 11000) {
      throw new AppError(409, "Product slug already exists", "CONFLICT");
    }
    throw err;
  }
}

export async function updateOwnerProduct(ownerId, productId, patch) {
  if (!isObjectId(productId)) throw invalidIdError("Invalid product id");
  const store = await requireOwnerStore(ownerId);
  if (patch.slug) {
    patch.slug = slugify(patch.slug);
    if (!patch.slug) throw invalidIdError("Invalid product slug");
  }
  if (patch.categoryId) {
    if (!isObjectId(patch.categoryId)) {
      throw invalidIdError("Invalid category id");
    }
    const category = await Category.findById(patch.categoryId);
    if (!category) throw new AppError(404, "Category not found", "NOT_FOUND");
  }
  try {
    const doc = await Product.findOneAndUpdate(
      { _id: productId, storeId: store._id },
      { $set: patch },
      { new: true },
    );
    if (!doc) throw new AppError(404, "Product not found", "NOT_FOUND");
    return toOwnerProductPayload(doc);
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err?.code === 11000) {
      throw new AppError(409, "Product slug already exists", "CONFLICT");
    }
    throw err;
  }
}

export async function getDashboard(ownerId) {
  const store = await requireOwnerStore(ownerId);
  const [productCount, orderCount, pendingOrders] = await Promise.all([
    Product.countDocuments({ storeId: store._id }),
    Order.countDocuments({ storeId: store._id }),
    Order.countDocuments({ storeId: store._id, status: ORDER_STATUS.PENDING }),
  ]);
  return {
    storeId: store._id.toString(),
    productCount,
    orderCount,
    pendingOrders,
  };
}

export async function listOwnerOrders(ownerId) {
  const store = await requireOwnerStore(ownerId);
  const docs = await Order.find({ storeId: store._id }).sort({ createdAt: -1 });
  return docs.map(toOwnerOrderPayload);
}

export async function updateOwnerOrderStatus(ownerId, orderId, { status }) {
  if (!isObjectId(orderId)) throw invalidIdError("Invalid order id");
  if (!ORDER_STATUS_VALUES.includes(status)) {
    throw new AppError(400, "Invalid order status", "VALIDATION_ERROR");
  }
  const store = await requireOwnerStore(ownerId);
  const order = await Order.findOneAndUpdate(
    { _id: orderId, storeId: store._id },
    { $set: { status } },
    { new: true },
  );
  if (!order) throw new AppError(404, "Order not found", "NOT_FOUND");
  return toOwnerOrderPayload(order);
}

export default {
  getStore,
  updateStore,
  listOwnerProducts,
  createOwnerProduct,
  updateOwnerProduct,
  getDashboard,
  listOwnerOrders,
  updateOwnerOrderStatus,
};

