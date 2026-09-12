import { AppError } from "../utils/app-error.js";
import { Address } from "../models/Address.js";
import { User } from "../models/User.js";
import { Wishlist } from "../models/Wishlist.js";
import { Product } from "../models/Product.js";
import { BikeRegistration } from "../models/BikeRegistration.js";
import { WheelRegistration } from "../models/WheelRegistration.js";

function toProfilePayload(user) {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? "",
    role: user.role,
  };
}

function toAddressPayload(address) {
  const raw = address.toObject ? address.toObject() : address;
  return {
    id: raw._id.toString(),
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
    isDefault: raw.isDefault,
  };
}

async function clearOtherDefaults(userId, keepId) {
  await Address.updateMany(
    { userId, _id: { $ne: keepId }, isDefault: true },
    { $set: { isDefault: false } },
  );
}

export async function getProfile(userId) {
  const user = await User.findById(userId);
  if (!user) throw new AppError(404, "User not found", "NOT_FOUND");
  return toProfilePayload(user);
}

export async function updateProfile(userId, patch) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: patch },
    { new: true },
  );
  if (!user) throw new AppError(404, "User not found", "NOT_FOUND");
  return toProfilePayload(user);
}

export async function listAddresses(userId) {
  const docs = await Address.find({ userId }).sort({ createdAt: -1 });
  return docs.map(toAddressPayload);
}

export async function createAddress(userId, payload) {
  const address = await Address.create({ ...payload, userId });
  if (address.isDefault) {
    await clearOtherDefaults(userId, address._id);
  }
  return toAddressPayload(address);
}

export async function updateAddress(userId, addressId, patch) {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    { $set: patch },
    { new: true },
  );
  if (!address) throw new AppError(404, "Address not found", "NOT_FOUND");
  if (patch.isDefault === true) {
    await clearOtherDefaults(userId, address._id);
  }
  return toAddressPayload(address);
}

export async function deleteAddress(userId, addressId) {
  const address = await Address.findOneAndDelete({ _id: addressId, userId });
  if (!address) throw new AppError(404, "Address not found", "NOT_FOUND");
  return { id: address._id.toString() };
}

function toWishlistItemPayload(item, product) {
  return {
    productId: item.productId.toString(),
    addedAt: item.addedAt,
    product: product
      ? {
          id: product._id.toString(),
          title: product.title,
          slug: product.slug,
          price: product.price,
          compareAtPrice: product.compareAtPrice ?? null,
          currency: product.currency,
          primaryImage: product.images?.[0] ?? null,
          status: product.status,
        }
      : null,
  };
}

async function getOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, items: [] });
  }
  return wishlist;
}

export async function getWishlist(userId) {
  const wishlist = await getOrCreateWishlist(userId);
  const productIds = wishlist.items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });
  const byId = new Map(products.map((p) => [p._id.toString(), p]));
  return wishlist.items.map((item) =>
    toWishlistItemPayload(item, byId.get(item.productId.toString())),
  );
}

export async function addWishlistItem(userId, { productId }) {
  const product = await Product.findById(productId);
  if (!product || product.status !== "active") {
    throw new AppError(404, "Product not found or unavailable", "NOT_FOUND");
  }
  const wishlist = await getOrCreateWishlist(userId);
  const exists = wishlist.items.some(
    (item) => item.productId.toString() === product._id.toString(),
  );
  if (!exists) {
    wishlist.items.push({ productId: product._id, addedAt: new Date() });
    await wishlist.save();
  }
  return getWishlist(userId);
}

export async function removeWishlistItem(userId, productId) {
  const wishlist = await getOrCreateWishlist(userId);
  const before = wishlist.items.length;
  wishlist.items = wishlist.items.filter(
    (item) => item.productId.toString() !== productId.toString(),
  );
  if (wishlist.items.length === before) {
    throw new AppError(404, "Wishlist item not found", "NOT_FOUND");
  }
  await wishlist.save();
  return getWishlist(userId);
}

function toBikePayload(doc) {
  const raw = doc.toObject ? doc.toObject() : doc;
  return {
    id: raw._id.toString(),
    serialNumber: raw.serialNumber,
    bikeName: raw.bikeName,
    modelYear: raw.modelYear ?? null,
    purchaseDate: raw.purchaseDate ?? null,
    purchaseLocation: raw.purchaseLocation ?? "",
  };
}

function toWheelPayload(doc) {
  const raw = doc.toObject ? doc.toObject() : doc;
  return {
    id: raw._id.toString(),
    serialNumber: raw.serialNumber,
    wheelName: raw.wheelName,
    purchaseId: raw.purchaseId ?? "",
    purchaseDate: raw.purchaseDate ?? null,
    purchaseLocation: raw.purchaseLocation ?? "",
  };
}

function duplicateSerialError() {
  return new AppError(409, "Serial number already registered", "CONFLICT");
}

export async function listBikes(userId) {
  const docs = await BikeRegistration.find({ userId }).sort({ createdAt: -1 });
  return docs.map(toBikePayload);
}

export async function createBike(userId, payload) {
  try {
    const doc = await BikeRegistration.create({ ...payload, userId });
    return toBikePayload(doc);
  } catch (err) {
    if (err?.code === 11000) throw duplicateSerialError();
    throw err;
  }
}

export async function listWheels(userId) {
  const docs = await WheelRegistration.find({ userId }).sort({ createdAt: -1 });
  return docs.map(toWheelPayload);
}

export async function createWheel(userId, payload) {
  try {
    const doc = await WheelRegistration.create({ ...payload, userId });
    return toWheelPayload(doc);
  } catch (err) {
    if (err?.code === 11000) throw duplicateSerialError();
    throw err;
  }
}

export default {
  getProfile,
  updateProfile,
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
  listBikes,
  createBike,
  listWheels,
  createWheel,
};
