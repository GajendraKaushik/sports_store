import { describe, expect, it, vi, beforeEach } from "vitest";

process.env.NODE_ENV = "test";
process.env.PORT = "5001";
process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/sports_store_test";
process.env.JWT_SECRET = "test-secret-for-vitest-only";
process.env.JWT_EXPIRES_IN = "7d";
process.env.CORS_ORIGIN = "http://localhost:5173";

const { createApp } = await import("../../src/app.js");
const { default: request } = await import("supertest");

vi.mock("../../src/services/auth.service.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    signup: vi.fn(async (payload) => ({
      id: "user-id-1",
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role ?? "user",
    })),
    login: vi.fn(async () => ({
      token: "mock-jwt-token",
      user: { id: "user-id-1", email: "user@test.com", role: "user" },
    })),
  };
});

vi.mock("../../src/services/product.service.js", () => ({
  listProducts: vi.fn(async () => ({
    items: [{ id: "prod-1", title: "Test Bike", slug: "test-bike" }],
    pagination: { page: 1, limit: 12, total: 1, pages: 1 },
  })),
  getProductBySlug: vi.fn(async () => ({ id: "prod-1", slug: "test-bike" })),
  listCategories: vi.fn(async () => [{ id: "cat-1", slug: "bikes" }]),
}));

vi.mock("../../src/services/cart.service.js", () => ({
  getCart: vi.fn(async () => ({ id: "cart-1", items: [], subtotal: 0 })),
  addItem: vi.fn(async () => ({ id: "cart-1", items: [{ productId: "p1" }] })),
  updateItem: vi.fn(async () => ({ id: "cart-1", items: [] })),
  removeItem: vi.fn(async () => ({ id: "cart-1", items: [] })),
}));

vi.mock("../../src/services/order.service.js", () => ({
  createOrderFromCart: vi.fn(async () => ({ id: "order-1", status: "pending" })),
  listUserOrders: vi.fn(async () => [{ id: "order-1" }]),
  getUserOrder: vi.fn(async () => ({ id: "order-1" })),
}));

vi.mock("../../src/services/owner.service.js", () => ({
  getStore: vi.fn(async () => ({ id: "store-1" })),
  updateStore: vi.fn(async () => ({ id: "store-1" })),
  listOwnerProducts: vi.fn(async () => []),
  createOwnerProduct: vi.fn(async () => ({ id: "prod-1" })),
  updateOwnerProduct: vi.fn(async () => ({ id: "prod-1" })),
  getDashboard: vi.fn(async () => ({ productCount: 1 })),
  listOwnerOrders: vi.fn(async () => [{ id: "order-1" }]),
  updateOwnerOrderStatus: vi.fn(async () => ({ id: "order-1", status: "confirmed" })),
}));

const { createTokenForTest } = await import("./helpers.js");

describe("backend slice (T20 baseline)", () => {
  let app;
  let userToken;
  let ownerToken;

  beforeEach(() => {
    app = createApp();
    userToken = createTokenForTest({ id: "user-id-1", role: "user" });
    ownerToken = createTokenForTest({ id: "owner-id-1", role: "owner" });
  });

  it("auth signup validates and returns 201", async () => {
    const res = await request(app).post("/api/v1/auth/signup").send({
      firstName: "Ada",
      lastName: "Rider",
      email: "ada@test.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("auth signup rejects bad payload with VALIDATION_ERROR", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({ email: "bad", password: "x" });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("product listing works without auth", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.status).toBe(200);
    expect(res.body.data.items).toHaveLength(1);
  });

  it("cart requires auth and mutates with token", async () => {
    const denied = await request(app).get("/api/v1/cart");
    expect(denied.status).toBe(401);

    const res = await request(app)
      .post("/api/v1/cart/items")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: "507f1f77bcf86cd799439011", quantity: 1 });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("order creation requires non-empty flow and auth", async () => {
    const denied = await request(app).post("/api/v1/orders").send({});
    expect(denied.status).toBe(401);

    const res = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ fulfillmentMethod: "pickup" });
    expect(res.status).toBe(201);
    expect(res.body.data.order.status).toBe("pending");
  });

  it("owner order status update is owner-only", async () => {
    const forbidden = await request(app)
      .patch("/api/v1/owner/orders/507f1f77bcf86cd799439011/status")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ status: "confirmed" });
    expect(forbidden.status).toBe(403);

    const res = await request(app)
      .patch("/api/v1/owner/orders/507f1f77bcf86cd799439011/status")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ status: "confirmed" });
    expect(res.status).toBe(200);
    expect(res.body.data.order.status).toBe("confirmed");
  });
});
