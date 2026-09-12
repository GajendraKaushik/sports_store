import * as orderService from "../services/order.service.js";

export async function createOrder(req, res) {
  const order = await orderService.createOrderFromCart(req.user.id, req.body);
  res.status(201).json({ success: true, data: { order } });
}

export async function listUserOrders(req, res) {
  const orders = await orderService.listUserOrders(req.user.id);
  res.status(200).json({ success: true, data: { orders } });
}

export async function getUserOrder(req, res) {
  const order = await orderService.getUserOrder(
    req.user.id,
    req.params.orderId,
  );
  res.status(200).json({ success: true, data: { order } });
}

export default { createOrder, listUserOrders, getUserOrder };
