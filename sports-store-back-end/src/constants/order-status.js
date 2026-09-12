export const ORDER_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  READY_FOR_PICKUP: "ready_for_pickup",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

export const ORDER_STATUS_VALUES = Object.freeze(Object.values(ORDER_STATUS));

export default ORDER_STATUS;
