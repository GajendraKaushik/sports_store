// I09: store profile editor. Reads GET /owner/store, saves PATCH /owner/store
// (name, slug, description, contactEmail, contactPhone, address).
import React, { useEffect, useState } from "react";
import { getOwnerStore, updateOwnerStore } from "../../../api/ownerApi.js";

const Owner_Store_Profile = () => {
  const [store, setStore] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getOwnerStore()
      .then((data) => {
        const s = data?.store ?? data;
        setStore(s);
        setForm({
          name: s?.name ?? "",
          slug: s?.slug ?? "",
          description: s?.description ?? "",
          contactEmail: s?.contactEmail ?? "",
          contactPhone: s?.contactPhone ?? "",
          address: s?.address ?? "",
        });
      })
      .catch((err) => setLoadError(err?.message ?? "Could not load store"))
      .finally(() => setLoading(false));
  }, []);

  const setField = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const data = await updateOwnerStore({
          name: form.name.trim(),
          slug: form.slug.trim(),
          description: form.description,
          contactEmail: form.contactEmail.trim(),
          contactPhone: form.contactPhone.trim(),
          address: form.address,
        });
      const s = data?.store ?? data;
      setStore(s);
      setForm({
        name: s?.name ?? form.name,
        slug: s?.slug ?? form.slug,
        description: s?.description ?? form.description,
        contactEmail: s?.contactEmail ?? form.contactEmail,
        contactPhone: s?.contactPhone ?? form.contactPhone,
        address: s?.address ?? form.address,
      });
      setSaved(true);
    } catch (err) {
      setSaveError(err?.message ?? "Could not save store");
    } finally {
      setSaving(false);
    }
  };

  const FIELD =
    "h-[46px] w-full p-3 rounded-md border-slate-400 border-2 mt-1";

  return (
    <div>
      <h1 className="text-3xl font-bold">Store Profile</h1>
      {loadError ? (
        <p className="text-red-600 mt-6">{loadError}</p>
      ) : loading || !form ? (
        <p className="mt-6">Loading store…</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl flex flex-col gap-4">
          <label className="text-sm font-medium">
            Store name
            <input value={form.name} onChange={setField("name")} required className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Slug (URL part)
            <input value={form.slug} onChange={setField("slug")} required className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Description
            <textarea
              value={form.description}
              onChange={setField("description")}
              rows={4}
              className="w-full p-3 rounded-md border-slate-400 border-2 mt-1"
            />
          </label>
          <label className="text-sm font-medium">
            Contact email
            <input type="email" value={form.contactEmail} onChange={setField("contactEmail")} className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Contact phone
            <input value={form.contactPhone} onChange={setField("contactPhone")} className={FIELD} />
          </label>
          <label className="text-sm font-medium">
            Address
            <input value={form.address} onChange={setField("address")} className={FIELD} />
          </label>
          {saveError ? <p className="text-red-600 text-sm">{saveError}</p> : null}
          {saved ? <p className="text-green-600 text-sm">Store saved.</p> : null}
          <button
            type="submit"
            disabled={saving}
            className="h-12 w-48 bg-neutral-900 text-white font-semibold rounded-md hover:bg-neutral-700 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Store"}
          </button>
          {store?.isActive === false ? (
            <p className="text-xs text-neutral-500">
              Store is currently inactive.
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
};

export default Owner_Store_Profile;
