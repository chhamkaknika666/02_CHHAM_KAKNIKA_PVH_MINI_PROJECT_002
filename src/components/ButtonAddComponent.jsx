'use client'

import React, { useState } from "react";
import { Button } from "@heroui/react";
import useCartStore from "../store/useCartStore";

export default function ButtonAddComponent({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [toast, setToast] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label="Add to cart"
        onPress={handleAdd}
        className="size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95"
      >
        +
      </Button>

      {toast && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-1 min-w-[260px] rounded-xl border border-gray-100 bg-white shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <span className="text-lime-500">✓</span> Added To Cart
            </div>
            <button
              onClick={() => setToast(false)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {product?.productName} is in your cart.
          </p>
        </div>
      )}
    </>
  );
}