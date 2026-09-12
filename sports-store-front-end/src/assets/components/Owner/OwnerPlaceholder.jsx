import React from "react";
import { Link } from "react-router-dom";

// U18: minimal owner placeholder. Real owner dashboard comes later.
// UI route names mirror the backend owner API plan where one exists
// (GET /api/v1/owner/store, /owner/products, /owner/orders,
// /owner/dashboard). /owner/login reuses POST /api/v1/auth/login with
// role=owner; /owner/inventory and /owner/store-profile are UI-only
// groupings (inventory = product stockQuantity view, store-profile =
// editor for GET/PATCH /api/v1/owner/store).
const OwnerPlaceholder = ({ title = "Owner" }) => {
  return (
    <div className="mt-28 mx-8 md:mx-20 mb-20">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-neutral-600">
        Owner flow placeholder. Backend integration will replace this screen.
      </p>
      <Link to="/" className="underline mt-6 inline-block">
        Back to store
      </Link>
    </div>
  );
};

export default OwnerPlaceholder;
