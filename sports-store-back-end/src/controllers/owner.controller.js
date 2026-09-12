import * as ownerService from "../services/owner.service.js";

export async function getStore(req, res) {
  const store = await ownerService.getStore(req.user.id);
  res.status(200).json({ success: true, data: { store } });
}

export async function updateStore(req, res) {
  const store = await ownerService.updateStore(req.user.id, req.body);
  res.status(200).json({ success: true, data: { store } });
}

export async function listProducts(req, res) {
  const products = await ownerService.listOwnerProducts(req.user.id);
  res.status(200).json({ success: true, data: { products } });
}

export async function createProduct(req, res) {
  const product = await ownerService.createOwnerProduct(req.user.id, req.body);
  res.status(201).json({ success: true, data: { product } });
}

export async function updateProduct(req, res) {
  const product = await ownerService.updateOwnerProduct(
    req.user.id,
    req.params.productId,
    req.body,
  );
  res.status(200).json({ success: true, data: { product } });
}

export async function getDashboard(req, res) {
  const dashboard = await ownerService.getDashboard(req.user.id);
  res.status(200).json({ success: true, data: { dashboard } });
}

export async function listOrders(req, res) {
  const orders = await ownerService.listOwnerOrders(req.user.id);
  res.status(200).json({ success: true, data: { orders } });
}

export async function updateOrderStatus(req, res) {
  const order = await ownerService.updateOwnerOrderStatus(
    req.user.id,
    req.params.orderId,
    req.body,
  );
  res.status(200).json({ success: true, data: { order } });
}

export default {
  getStore,
  updateStore,
  listProducts,
  createProduct,
  updateProduct,
  getDashboard,
  listOrders,
  updateOrderStatus,
};
