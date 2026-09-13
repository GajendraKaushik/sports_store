// I09: owner products. GET/POST /owner/products + PATCH /owner/products/:id.
// Price/status edits here are what the storefront (GET /products) shows.
// No delete, no image upload — out of scope per plan.
import React, { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api.js";
import { formatPrice } from "../../../lib/format.js";

const STATUSES = ["draft", "active", "archived"];

const EMPTY_FORM = {
  title: "",
  categoryId: "",
  price: "",
  compareAtPrice: "",
  stockQuantity: "0",
  sizes: "",
  images: "",
  description: "",
  status: "draft",
};

function formFromProduct(product) {
  return {
    title: product.title ?? "",
    categoryId: product.categoryId ?? "",
    price: String(product.price ?? ""),
    compareAtPrice:
      product.compareAtPrice == null ? "" : String(product.compareAtPrice),
    stockQuantity: String(product.stockQuantity ?? 0),
    sizes: (product.sizes ?? []).join(", "),
    images: (product.images ?? []).join("\n"),
    description: "",
    status: product.status ?? "draft",
  };
}

function payloadFromForm(form) {
  const payload = {
    title: form.title.trim(),
    categoryId: form.categoryId,
    price: Number(form.price),
    stockQuantity: Number(form.stockQuantity || 0),
    sizes: form.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    images: form.images
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    status: form.status,
  };
  if (form.compareAtPrice.trim() !== "") {
    payload.compareAtPrice = Number(form.compareAtPrice);
  }
  if (form.description.trim() !== "") {
    payload.description = form.description.trim();
  }
  return payload;
}

const Owner_Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const load = useCallback(() => {
    apiFetch("/owner/products")
      .then((data) => setProducts(data?.products ?? []))
      .catch((err) => setError(err?.message ?? "Could not load products"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
    apiFetch("/categories")
      .then((data) => setCategories(data?.categories ?? data?.items ?? []))
      .catch(() => setCategories([]));
  }, [load]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, categoryId: categories[0]?.id ?? "" });
    setFormError(null);
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm(formFromProduct(product));
    setFormError(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const setField = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setFormError(null);
    try {
      const payload = payloadFromForm(form);
      if (editingId) {
        const data = await apiFetch(`/owner/products/${editingId}`, {
          method: "PATCH",
          body: payload,
        });
        const updated = data?.product ?? data;
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p)),
        );
      } else {
        const data = await apiFetch("/owner/products", {
          method: "POST",
          body: payload,
        });
        const created = data?.product ?? data;
        setProducts((prev) => [created, ...prev]);
      }
      closeForm();
    } catch (err) {
      setFormError(err?.message ?? "Could not save product");
    } finally {
      setSaving(false);
    }
  };

  const FIELD = "h-[46px] w-full p-3 rounded-md border-slate-400 border-2 mt-1";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={openCreate}
          className="h-11 px-5 bg-neutral-900 text-white text-sm font-semibold rounded-md hover:bg-neutral-700"
        >
          New Product
        </button>
      </div>

      {formOpen ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white shadow-3xl rounded-md p-6 grid sm:grid-cols-2 gap-4"
        >
          <h2 className="sm:col-span-2 text-lg font-semibold">
            {editingId ? "Edit product" : "New product"}
          </h2>
          <label className="text-sm font-medium sm:col-span-2">
            Title
            <input value={form.title} onChange={setField("title")} required className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Category
            <select value={form.categoryId} onChange={setField("categoryId")} required className={FIELD}>
              <option value="">Select…</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Status
            <select value={form.status} onChange={setField("status")} className={FIELD}>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Price
            <input type="number" min="0" step="0.01" value={form.price} onChange={setField("price")} required className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Compare-at price (optional)
            <input type="number" min="0" step="0.01" value={form.compareAtPrice} onChange={setField("compareAtPrice")} className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Stock quantity
            <input type="number" min="0" value={form.stockQuantity} onChange={setField("stockQuantity")} className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Sizes (comma separated)
            <input value={form.sizes} onChange={setField("sizes")} placeholder="S, M, L" className={FIELD} />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Image URLs (one per line)
            <textarea
              value={form.images}
              onChange={setField("images")}
              rows={3}
              placeholder="https://…"
              className="w-full p-3 rounded-md border-slate-400 border-2 mt-1"
            />
          </label>
          {!editingId ? (
            <label className="text-sm font-medium sm:col-span-2">
              Description (optional)
              <textarea
                value={form.description}
                onChange={setField("description")}
                rows={3}
                className="w-full p-3 rounded-md border-slate-400 border-2 mt-1"
              />
            </label>
          ) : null}
          {formError ? (
            <p className="sm:col-span-2 text-red-600 text-sm">{formError}</p>
          ) : null}
          <div className="sm:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="h-12 w-40 bg-neutral-900 text-white font-semibold rounded-md hover:bg-neutral-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : editingId ? "Save Changes" : "Create Product"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="h-12 px-6 underline font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {error ? (
        <p className="text-red-600 mt-6">{error}</p>
      ) : loading ? (
        <p className="mt-6">Loading products…</p>
      ) : products.length ? (
        <div className="mt-8 grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-3xl rounded-md p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{product.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-stone-100 border border-stone-300">
                    {product.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  /{product.slug} · stock {product.stockQuantity}
                  {product.sizes?.length ? ` · sizes ${product.sizes.join(", ")}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">
                  {formatPrice(product.price, product.currency)}
                </div>
                <button
                  onClick={() => openEdit(product)}
                  className="h-10 px-4 border border-gray-500 rounded-md text-sm font-medium hover:border-gray-900"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-600 mt-6">No products yet.</p>
      )}
    </div>
  );
};

export default Owner_Products;
