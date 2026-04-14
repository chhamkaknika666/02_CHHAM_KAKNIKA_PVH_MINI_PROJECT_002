"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { categoriesResponse, products } from "../../data/mockData";
import ProductCardComponent from "../ProductCardComponent";

const PAGE_SIZE = 8;

export default function LandingEssentialsGrid({
  isloggedin,
  essentialsProducts = null,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const productsToDisplay = essentialsProducts ? essentialsProducts : products;
  const isUsingApiProducts =
    essentialsProducts !== null && essentialsProducts !== products;

  const filtered = selectedCategoryId
    ? productsToDisplay.filter((p) => p.categoryId === selectedCategoryId)
    : productsToDisplay;

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const canLoadMore = !showAll && filtered.length > PAGE_SIZE;
  const categories = categoriesResponse.data || [];

  return (
    <section id="shop" className="mx-auto w-full max-w-7xl py-16 lg:py-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Our skincare essentials
        </h2>
        <p className="mt-2 max-w-lg text-gray-500">
          Filter by routine step - same mock catelog, organized for quick
          discovery.
        </p>
      </div>
      {isloggedin && (
        <div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Product categories"
        >
          <Button
            role="tab"
            aria-selected={!selectedCategoryId}
            onPress={() => {
              setSelectedCategoryId(null);
              setShowAll(false);
            }}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              !selectedCategoryId
                ? "bg-lime-400 text-gray-900 shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </Button>
          {categories.map((category) => {
            const on = selectedCategoryId === category.categoryId;
            return (
              <Button
                key={category.categoryId}
                role="tab"
                aria-selected={on}
                onPress={() => {
                  setSelectedCategoryId(category.categoryId);
                  setShowAll(false);
                }}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  on
                    ? "bg-lime-400 text-gray-900 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.categoryName}
              </Button>
            );
          })}
        </div>
      )}

      {isloggedin && (
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {visible.map((product, index) => (
            <ProductCardComponent product={product} key={index} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          No products in this category — try "All".
        </p>
      )}

      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="secondary"
            onPress={() => setShowAll(true)}
            className="rounded-full border border-gray-200 bg-white px-10 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
