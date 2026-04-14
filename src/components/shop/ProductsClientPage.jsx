"use client";

import { useState, useMemo } from "react";
import ShopCardComponent from "./ShopCardComponent";

const PRICE_MAX = 300;

const QUICK_SELECTS = [
  { label: "Under $50", max: 50 },
  { label: "Under $100", max: 100 },
  { label: "Under $150", max: 150 },
  { label: "All prices", max: PRICE_MAX },
];

export default function ProductsClientPage({ products = [] }) {
  const [priceRange, setPriceRange] = useState(PRICE_MAX);
  const [activeQuick, setActiveQuick] = useState("All prices");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");

  const allCategories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const price = Number(p.price ?? 0);

      if (price > priceRange) return false;

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      )
        return false;

      if (
        search.trim() &&
        !p.name?.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      return true;
    });
  }, [products, priceRange, selectedCategories, search]);

  const handleSlider = (e) => {
    const val = Number(e.target.value);
    setPriceRange(val);
    const match = QUICK_SELECTS.find((q) => q.max === val);
    setActiveQuick(match ? match.label : "");
  };

  const handleQuickSelect = (qs) => {
    setActiveQuick(qs.label);
    setPriceRange(qs.max);
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const resetFilters = () => {
    setPriceRange(PRICE_MAX);
    setActiveQuick("All prices");
    setSelectedCategories([]);
    setSearch("");
  };

  return (
    <div className="flex gap-8">
      <aside className="w-56 shrink-0">
        <div className="border rounded-lg p-4 space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Filters</span>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-500 hover:text-black underline"
            >
              Reset filters
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
              Price Range
            </p>
            <p className="text-sm mb-2">
              $0 – ${priceRange}
              {priceRange === PRICE_MAX && (
                <span className="text-gray-400"> (no limit)</span>
              )}
            </p>
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={10}
              value={priceRange}
              onChange={handleSlider}
              className="w-full accent-black"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$0</span>
              <span>${PRICE_MAX}</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Quick Select
            </p>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_SELECTS.map((qs) => (
                <button
                  key={qs.label}
                  onClick={() => handleQuickSelect(qs)}
                  className={`text-sm border rounded px-2 py-1 transition-colors ${
                    activeQuick === qs.label
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {qs.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Categories
            </p>

            {allCategories.length === 0 && (
              <p className="text-xs text-gray-400">No categories found.</p>
            )}

            {allCategories.map((cat) => {
              const totalCount = products.filter(
                (p) => p.category === cat,
              ).length;
              const isChecked = selectedCategories.includes(cat);

              return (
                <label
                  key={cat}
                  className="flex items-center justify-between py-1.5 cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-black border-black"
                          : "border-gray-400 group-hover:border-black"
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(cat)}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </div>

                  <span className="text-xs text-gray-400 tabular-nums">
                    {totalCount}
                  </span>
                </label>
              );
            })}

            <p className="text-xs text-gray-400 mt-3">
              Select none to include all categories.
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-4 gap-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-black">{filtered.length}</span>{" "}
            product{filtered.length !== 1 ? "s" : ""}
          </p>
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">
            No products match the selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ShopCardComponent key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
