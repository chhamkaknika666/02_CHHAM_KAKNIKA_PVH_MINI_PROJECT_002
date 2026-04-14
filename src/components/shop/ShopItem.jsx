"use client";

import { useRouter } from "next/navigation";
import { placeOrderAction } from "../../action/order.action";

export default function ShopItem({ product }) {
  const router = useRouter();

  const handleCheckout = async () => {
    const orderData = {
      orderItems: [{
        productId: product.id,
        quantity: 1,
        price: product.price,
        productName: product.name
      }],
      totalAmount: product.price
    };

    const res = await placeOrderAction(orderData);

    if (res && res.success) {
      router.push("/orders");
    } else {
      alert("Order failed: " + (res?.error || "fetch failed"));
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
      <h3 className="font-bold mb-2">{product.name}</h3>
      <button
        onClick={handleCheckout}
        className="w-full py-3 bg-[#ADFF2F] text-black font-bold rounded-2xl hover:bg-[#96E028] transition-all"
      >
        Buy Now
      </button>
    </div>
  );
}