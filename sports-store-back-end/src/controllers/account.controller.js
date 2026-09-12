import * as accountService from "../services/account.service.js";

export async function getProfile(req, res) {
  const profile = await accountService.getProfile(req.user.id);
  res.status(200).json({ success: true, data: { profile } });
}

export async function updateProfile(req, res) {
  const profile = await accountService.updateProfile(req.user.id, req.body);
  res.status(200).json({ success: true, data: { profile } });
}

export async function listAddresses(req, res) {
  const addresses = await accountService.listAddresses(req.user.id);
  res.status(200).json({ success: true, data: { addresses } });
}

export async function createAddress(req, res) {
  const address = await accountService.createAddress(req.user.id, req.body);
  res.status(201).json({ success: true, data: { address } });
}

export async function updateAddress(req, res) {
  const address = await accountService.updateAddress(
    req.user.id,
    req.params.addressId,
    req.body,
  );
  res.status(200).json({ success: true, data: { address } });
}

export async function deleteAddress(req, res) {
  const result = await accountService.deleteAddress(
    req.user.id,
    req.params.addressId,
  );
  res.status(200).json({ success: true, data: result });
}

export async function getWishlist(req, res) {
  const items = await accountService.getWishlist(req.user.id);
  res.status(200).json({ success: true, data: { items } });
}

export async function addWishlistItem(req, res) {
  const items = await accountService.addWishlistItem(req.user.id, req.body);
  res.status(200).json({ success: true, data: { items } });
}

export async function removeWishlistItem(req, res) {
  const items = await accountService.removeWishlistItem(
    req.user.id,
    req.params.productId,
  );
  res.status(200).json({ success: true, data: { items } });
}

export async function listBikes(req, res) {
  const bikes = await accountService.listBikes(req.user.id);
  res.status(200).json({ success: true, data: { bikes } });
}

export async function createBike(req, res) {
  const bike = await accountService.createBike(req.user.id, req.body);
  res.status(201).json({ success: true, data: { bike } });
}

export async function listWheels(req, res) {
  const wheels = await accountService.listWheels(req.user.id);
  res.status(200).json({ success: true, data: { wheels } });
}

export async function createWheel(req, res) {
  const wheel = await accountService.createWheel(req.user.id, req.body);
  res.status(201).json({ success: true, data: { wheel } });
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
