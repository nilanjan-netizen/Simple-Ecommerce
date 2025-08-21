"use client";
import { useEffect, useState } from "react";
import { Package } from "lucide-react";

type Order = {
  product: string;
  quantity: number;
  customer: string;
  amount: number;
  method: string;
  date: string;
  payment: string;
};

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedOrders = sessionStorage.getItem("orders");
        const ordersData = storedOrders ? JSON.parse(storedOrders) : [];
        setOrders(ordersData.slice(0, 5)); // latest 5 orders
      } catch (error) {
        console.error("Error reading orders from sessionStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold text-red-500">ADMIN DASHBOARD</div>
        <nav className="flex-1 px-4 space-y-2">

          <a
            href="https://dashboard.stripe.com/test/products?active=true"
            target="_blank"
            className="block py-2 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 text-white font-semibold shadow-md hover:from-yellow-500 hover:to-blue-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Add Product
          </a>

          <a
            href="https://dashboard.stripe.com/test/payments"
            target="_blank"
            className="block py-2 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md hover:from-red-500 hover:to-pink-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Transactions
          </a>

          <a
            href="#"
            className="block py-2 px-4 rounded-xl bg-gradient-to-r from-orange-400 to-red-600 text-white font-semibold shadow-md 
             hover:from-red-600 hover:to-orange-400 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            📦 Orders
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Orders</h1>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-lg p-4 flex items-start gap-4"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-lg">
                  <Package size={28} />
                </div>

                {/* Order Details */}
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">
                    {order.product} x {order.quantity}
                  </h2>
                  <p className="text-sm text-gray-500">Items : {order.quantity}</p>
                  <p className="mt-2 text-gray-700">{order.customer}</p>
                </div>

                {/* Price + Info */}
                <div className="text-right bg-gray-50 rounded-lg p-3 shadow-inner min-w-[180px]">
                  {/* Amount */}
                  <p className="text-xl font-bold text-green-600 mb-2">
                    ${order.amount.toFixed(2)}
                  </p>

                  {/* Method */}
                  <p className="text-sm text-red-700">
                    <span className="font-medium text-red-900">Method:</span> {order.method}
                  </p>

                  {/* Date */}
                  <p className="text-sm text-red-700">
                    <span className="font-medium text-gray-900">Date:</span> {order.date}
                  </p>

                  {/* Payment */}
                  <p
                    className={`text-sm font-medium mt-1 ${
                      order.payment === "Completed"
                        ? "text-green-600"
                        : order.payment === "Failed"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Payment: {order.payment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
