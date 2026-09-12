import { AppError } from "../utils/app-error.js";
import { Address } from "../models/Address.js";
import { User } from "../models/User.js";

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

export default {
  getProfile,
  updateProfile,
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
