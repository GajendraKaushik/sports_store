import React, { useEffect, useRef, useState } from "react";
import {
  EMPTY_FILTERS,
  buildFilterSections,
  countActiveFilters,
  toggleFilterValue,
} from "../../../services/productService.js";

const FilterSection = ({ section, isOpen, expanded, onToggle, onToggleMore, checkboxList, pillList }) => {
  const visibleOptions =
    section.visibleLimit && !expanded
      ? section.options.slice(0, section.visibleLimit)
      : section.options;
  return (
    <div className="border-t border-neutral-200 py-4 first:border-t-0 first:pt-0">
      <button type="button" onClick={onToggle} aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left">
        <span className="text-lg font-bold">{section.title}</span>
        <span className="text-xl leading-none">
          <ion-icon name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}></ion-icon>
        </span>
      </button>
      {isOpen && (
        <div className="pt-4">
          {section.options.length === 0 ? (
            <p className="text-sm text-neutral-500">No options yet.</p>
          ) : section.variant === "pills" ? (
            pillList(section, visibleOptions)
          ) : (
            checkboxList(section, visibleOptions)
          )}
          {section.visibleLimit && section.options.length > section.visibleLimit && (
            <button type="button" onClick={onToggleMore}
              className="mt-4 text-base font-normal text-neutral-800 underline">
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
// UI / Presentation layer — filter panel.
//
// Responsibility: render checkboxes/pills from facet data and report the
// user's selections upward. No API calls, no query building — facets come
// in as props (produced by useProductFacets) and selection is delegated to
// productService.toggleFilterValue / countActiveFilters.
const Product_Filters = ({ facets = null, value = EMPTY_FILTERS, onChange }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [openSections, setOpenSections] = useState({ Category: true });
  const [showMore, setShowMore] = useState({});
  const selected = value ?? EMPTY_FILTERS;
  const activeCount = countActiveFilters(selected);

  useEffect(() => {
    if (!filterOpen) return;
    const onDown = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setFilterOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [filterOpen]);

  const toggleSection = (title) =>
    setOpenSections((p) => ({ ...p, [title]: !p[title] }));

  const toggleValue = (key, v) =>
    onChange?.(toggleFilterValue(selected, key, v));

  const checkboxList = (section, visibleOptions) => (
    <div className="flex flex-col gap-4">
      {visibleOptions.map((option) => (
        <label key={option.value} className="flex items-center gap-3 text-base cursor-pointer">
          <input type="checkbox"
            checked={(selected[section.key] ?? []).includes(option.value)}
            onChange={() => toggleValue(section.key, option.value)}
            className="h-5 w-5 accent-neutral-900" />
          <span>{option.label}{" "}<span className="text-neutral-500">({option.count})</span></span>
        </label>
      ))}
    </div>
  );

  const pillList = (section, visibleOptions) => (
    <div className="grid grid-cols-2 gap-3">
      {visibleOptions.map((option) => {
        const active = (selected[section.key] ?? []).includes(option.value);
        return (
          <button key={option.value} type="button" aria-pressed={active}
            onClick={() => toggleValue(section.key, option.value)}
            className={`h-11 rounded-md border text-base font-semibold transition-colors ${active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900"}`}>
            {option.label}
          </button>
        );
      })}
    </div>
  );

  const sections = buildFilterSections(facets);

  return (
    <div ref={filterRef} className="relative md:w-48 w-full">
      <button type="button" onClick={() => setFilterOpen((o) => !o)}
        aria-haspopup="dialog" aria-expanded={filterOpen}
        className="w-full h-12 bg-neutral-800 hover:bg-neutral-500 text-white font-semibold rounded-md">
                <span className="flex justify-between items-center mx-4">
          <span>Filters{activeCount > 0 ? ` (${activeCount})` : ""}</span>
          <span className="text-xl text-white font-bold leading-none">
            <ion-icon name="options-outline"></ion-icon>
          </span>
        </span>
      </button>
      {filterOpen && (
        <div role="dialog" aria-label="Filter products"
          className="absolute right-0 top-full z-50 w-80 max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto rounded-md bg-white shadow-xl border border-neutral-200 p-5 text-neutral-900">
          <div className="flex flex-col">
            {sections.map((section) => (
              <FilterSection key={section.key} section={section}
                isOpen={!!openSections[section.title]}
                expanded={!!showMore[section.title]}
                onToggle={() => toggleSection(section.title)}
                onToggleMore={() => setShowMore((p) => ({ ...p, [section.title]: !p[section.title] }))}
                checkboxList={checkboxList} pillList={pillList} />
            ))}
            {activeCount > 0 && (
              <button type="button" onClick={() => onChange?.({ ...EMPTY_FILTERS })}
                className="mt-4 text-sm font-semibold text-neutral-600 underline hover:text-neutral-900">
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product_Filters;

