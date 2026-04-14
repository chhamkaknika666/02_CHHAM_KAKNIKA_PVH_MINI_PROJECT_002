'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import useCartStore from "../../../store/useCartStore";
import { placeOrderAction } from "../../../action/order.action";

export default function CartPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false); 

  const { items, increaseQty, decreaseQty, removeFromCart, clearCart, getTotalPrice } =
    useCartStore();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsPending(true);
    try {
      const orderData = {
        orderItems: items,
        totalAmount: getTotalPrice(),
      };

      const res = await placeOrderAction(orderData);
      
      if (res && res.success) {
        clearCart();
        router.push("/orders"); 
      } else {
        alert("Order failed: " + (res?.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong with your order logic.");
    } finally {
      setIsPending(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Your cart</h1>
        <p className="text-sm text-gray-400 mb-8">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-block bg-lime-400 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-lime-300 transition"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-1">Your cart</h1>
      <p className="text-sm text-gray-400 mb-6">
        Cart is stored in memory for this visit — refreshing the page clears it.
      </p>

      <p className="text-sm font-medium text-gray-700 mb-4">
        {totalItems} product{totalItems > 1 ? "s" : ""} in cart
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-gray-300 text-xl">
                  ◇
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                {item.productName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">green · l</p>
              <p className="text-sm text-gray-600 mt-1">
                ${Number(item.price).toFixed(2)} each
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1">
                <button
                  onClick={() => decreaseQty(item.productId)}
                  className="text-gray-500 hover:text-gray-800 text-base leading-none transition"
                >
                  −
                </button>
                <span className="text-sm font-semibold tabular-nums w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQty(item.productId)}
                  className="text-gray-500 hover:text-gray-800 text-base leading-none transition"
                >
                  +
                </button>
              </div>

              <p className="text-sm font-semibold tabular-nums text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-xs text-red-400 hover:text-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <p className="text-base font-semibold text-gray-900">Subtotal</p>
          <p className="text-base font-bold tabular-nums text-gray-900">
            ${getTotalPrice().toFixed(2)}
          </p>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Tax and shipping calculated at checkout (demo).
        </p>

        <button 
          onClick={handleCheckout}
          disabled={isPending}
          className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-gray-700 transition mb-3 disabled:bg-gray-400"
        >
          {isPending ? "Processing..." : "Checkout"}
        </button>
        
        <button
          onClick={clearCart}
          className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
        >
          Clear cart
        </button>
      </div>
    </main>
  );
}