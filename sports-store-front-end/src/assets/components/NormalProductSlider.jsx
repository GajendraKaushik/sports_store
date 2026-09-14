import React from "react";
import CaroselContainer from "./CaroselContainer";
import NormalProductCard from "./NormalProductCard";
import { useHomeProducts } from "../../hooks/useProducts.js";

// Products come live from GET /products (via useHomeProducts); each card
// shows the product's own primaryImage (category-themed dummy SVGs until
// real photos are dropped into the backend's public/images folder and the
// seed is re-run).
const NormalProductSlider = () => {
  const { products } = useHomeProducts();

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
