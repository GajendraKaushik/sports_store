import React, { useEffect, useState } from "react";
import CaroselContainer from "./CaroselContainer";
import NormalProductCard from "./NormalProductCard";
import { apiFetch } from "../../lib/api.js";

// Products come live from GET /products; each card shows the product's own
// primaryImage (category-themed dummy SVGs until real photos are dropped into
// the backend's public/images folder and the seed is re-run).
const NormalProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    apiFetch("/products")
      .then((data) => {
        if (!cancelled) setProducts(data?.items ?? []);
      })
      .catch(() => {
        // Slider stays empty on failure; the /products page surfaces errors.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="px-12 pt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 text-left">Rider Favorites</h2>
      </div>
      <CaroselContainer>
        {products.map((product) => (
          <NormalProductCard key={product.id} product={product} />
        ))}
      </CaroselContainer>
    </section>
  );
};

export default NormalProductSlider;
