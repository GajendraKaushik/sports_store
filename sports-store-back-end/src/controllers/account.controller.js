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

export default {
  getProfile,
  updateProfile,
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
