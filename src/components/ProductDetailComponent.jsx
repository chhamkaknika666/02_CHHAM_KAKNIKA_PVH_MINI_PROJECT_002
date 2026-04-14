"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCartStore from "../store/useCartStore";
import RatingComponent from "./RatingComponent";

const COLORS = [
  { name: "green", hex: "#4ade80", border: "#16a34a" },
  { name: "gray", hex: "#9ca3af", border: "#6b7280" },
];

const SIZES = ["s", "m", "l"];

export default function ProductDetailComponent({ product }) {
  const router = useRouter();
  const addToCart = useCartStore((s) => s.addToCart);

  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [selectedSize, setSelectedSize] = useState("s");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const images = Array.isArray(product?.images)
    ? product.images
    : product?.image
      ? [product.image]
      : product?.imageUrl
        ? [product.imageUrl]
        : [];
  const [activeImg, setActiveImg] = useState(0);

  const colorObj = COLORS.find((c) => c.name === selectedColor) ?? COLORS[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product?.productId || product?.id,
      id: product?.productId || product?.id,
      name: product?.productName || product?.name,
      price: Number(product?.price),
      image: images[0] ?? "",
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => router.push("/cart"), 800);
  };

  return (
    <main className="container mx-auto px-6 py-8 max-w-6xl">
      <nav className="text-sm text-gray-500 mb-6 flex gap-1">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900">
          {product?.productName || product?.name}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border mb-4">
            {images[activeImg] ? (
              <Image
                src={images[activeImg]}
                alt={(product?.productName || product?.name) ?? "product"}
                fill
                className="object-cover p-6"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                No image
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setActiveImg((p) => Math.max(0, p - 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
              >
                ‹
              </button>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </button>
              ))}
              <button
                onClick={() =>
                  setActiveImg((p) => Math.min(images.length - 1, p + 1))
                }
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
              >
                ›
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold">
                {product?.productName || product?.name}
              </h1>
              <RatingComponent productId={product?.productId || product?.id} />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-gray-900">
                ${Number(product?.price).toFixed(2)}
              </span>
              {product?.originalPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Choose a color</p>
            <div className="flex gap-3 flex-wrap">
              {COLORS.map((c) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={
                      isSelected
                        ? {
                            backgroundColor: c.hex,
                            borderColor: c.border,
                            color: c.name === "green" ? "#15803d" : "#374151",
                          }
                        : {}
                    }
                    className={`px-4 py-1.5 rounded-full border-2 text-sm font-medium capitalize transition-all ${
                      isSelected
                        ? "border-2"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Selected: {selectedColor}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Choose a size</p>
            <div className="flex gap-3">
              {SIZES.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full border-2 text-sm font-medium uppercase transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product?.description}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 text-xl font-light hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 text-xl font-light hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white rounded-lg py-2.5 px-6 font-semibold flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
            >
              🛒 Add to cart
            </button>
          </div>

          {added && (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700">
              <span>Added to cart —</span>
              <Link href="/cart" className="underline font-medium">
                view cart
              </Link>
            </div>
          )}

          <div className="border rounded-xl p-4 flex items-start gap-3 text-sm text-gray-600">
            <span className="text-lg">↩️</span>
            <div>
              <p className="font-semibold text-gray-800">Free 30-day returns</p>
              <p className="text-gray-400">
                See return policy details in cart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
