import { getOrdersAction } from "../../../action/order.action";
import Link from "next/link";

export default async function OrdersPage() {
  const res = await getOrdersAction();
  const orders = res?.payload || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-1">Your Orders</h1>
        <p className="text-gray-400 text-sm">
          {orders.length} order{orders.length !== 1 ? "s" : ""} from your account.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-4">No orders yet.</p>
          <Link
            href="/products"
            className="inline-block bg-lime-400 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-lime-300 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderReceipt key={order.orderId} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderReceipt({ order }) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
            Order ID
          </span>
          <p className="font-mono text-sm text-gray-800">#{order.orderId}</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
            Total
          </span>
          <p className="text-2xl font-bold text-gray-900">
            ${Number(order.totalAmount).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
            Order Date
          </span>
          <p className="text-sm text-gray-700">
            {order.orderDate
              ? new Date(order.orderDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
            Status
          </span>
          <span className="inline-block text-xs font-semibold bg-lime-100 text-lime-700 px-3 py-1 rounded-full">
            {order.status || "Confirmed"}
          </span>
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-4">
          Items Ordered
        </span>
        <div className="space-y-3">
          {order.orderDetailsResponse?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0" />
                <p className="text-gray-800 font-medium">
                  {item.productName || `Product ${item.productId}`}
                </p>
              </div>
              <div className="flex items-center gap-6 text-gray-500">
                <span>Qty {item.orderQty}</span>
                <span className="font-semibold text-gray-900 tabular-nums w-20 text-right">
                  ${Number(item.orderTotal).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}