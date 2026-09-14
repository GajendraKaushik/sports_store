import React, { useEffect, useRef, useState } from "react";
import { SORT_OPTIONS } from "../../../services/productService.js";

export { SORT_OPTIONS };

// Reusable sort dropdown (single-select radios).
// Owns its open/close state; parent owns the value.
// Usage: <Product_Sort value={sort} onChange={setSort} />
const Product_Sort = ({
  value = "",
  onChange,
  buttonPrefix = "Sort By",
  className = "relative w-36 md:w-56",
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  const activeSortOption = SORT_OPTIONS.find(
    (option) => option.value === value,
  );

  useEffect(() => {
    if (!sortOpen) return;
    const handlePointerDown = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sortOpen]);

  return (
    <div ref={sortRef} className={className}>
      <button
        type="button"
        onClick={() => setSortOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={sortOpen}
        className="w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md text-center"
      >
        <div className="flex justify-between items-center gap-3 px-4">
          <p className="truncate">
            {activeSortOption
              ? `${buttonPrefix}: ${activeSortOption.label}`
              : buttonPrefix}
          </p>
          <p className="text-xl text-white font-bold leading-none">
            <ion-icon
              name={
                sortOpen ? "chevron-up-outline" : "chevron-down-outline"
              }
            ></ion-icon>
          </p>
        </div>
      </button>
      {sortOpen && (
        <div
          role="listbox"
          aria-label="Sort products"
          className="absolute left-0 top-full z-50 w-72 rounded-md bg-white shadow-xl border border-neutral-200 p-5 text-neutral-900"
        >
          <div className="flex flex-col gap-5">
            {SORT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer text-lg"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => {
                    onChange?.(option.value);
                    setSortOpen(false);
                  }}
                  className="h-5 w-5 accent-neutral-900"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product_Sort;
