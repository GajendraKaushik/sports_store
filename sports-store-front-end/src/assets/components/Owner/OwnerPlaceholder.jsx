import React from "react";
import { Link } from "react-router-dom";

// U18: minimal owner placeholder. Real owner dashboard comes later;
// route names already match the backend owner API plan.
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
