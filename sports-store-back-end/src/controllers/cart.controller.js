import * as cartService from "../services/cart.service.js";

export async function getCart(req, res) {
  const cart = await cartService.getCart(req.user.id);
  res.status(200).json({ success: true, data: { cart } });
}

export async function addItem(req, res) {
  const cart = await cartService.addItem(req.user.id, req.body);
  res.status(200).json({ success: true, data: { cart } });
}

export async function updateItem(req, res) {
  const cart = await cartService.updateItem(
    req.user.id,
    req.params.productId,
    req.body,
  );
  res.status(200).json({ success: true, data: { cart } });
}

export async function removeItem(req, res) {
  const cart = await cartService.removeItem(req.user.id, req.params.productId);
  res.status(200).json({ success: true, data: { cart } });
}

export default { getCart, addItem, updateItem, removeItem };
