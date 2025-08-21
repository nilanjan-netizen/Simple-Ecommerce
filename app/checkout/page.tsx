"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import { saveAddress, getAddresses, saveOrder } from "@/store/address-store";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const router = useRouter();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    postalCode: "",
    street: "",
    city: "",
    state: "",
    country: "India",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online"); // default online

  // Load most recent address
  useEffect(() => {
    const addresses = getAddresses();
    if (addresses.length > 0) {
      setAddress(addresses[0]);
    }
  }, []);

  const handleAddressChange = (field: keyof typeof address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Save address
    saveAddress(address);

    if (paymentMethod === "cod") {
      // Save order immediately for COD
      saveOrder(items, address, total, "COD", "Pending");

      // Redirect home
      router.push("/");
      return;
    }

    // Online payment
    const formData = new FormData();
    formData.append("items", JSON.stringify(items));
    formData.append("address", JSON.stringify(address));
    formData.append("total", total.toString());

    await checkoutAction(formData);

    // Save order as paid (after redirect from gateway you can also confirm)
    saveOrder(items, address, total, "Online", "Paid");

    setIsSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <form
        onSubmit={handleProceed}
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
      >
        {/* Order Summary */}
        <div className="border rounded-xl p-6 shadow bg-white">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="border px-2 rounded"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    className="border px-2 rounded"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="border rounded-xl p-6 shadow bg-white space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            Delivery <span className="text-orange-500">Address</span>
          </h2>

          <input
            type="text"
            value={address.name}
            onChange={(e) => handleAddressChange("name", e.target.value)}
            placeholder="Full Name"
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            type="tel"
            value={address.phone}
            onChange={(e) => handleAddressChange("phone", e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            type="text"
            value={address.postalCode}
            onChange={(e) => handleAddressChange("postalCode", e.target.value)}
            placeholder="Pin Code"
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <textarea
            value={address.street}
            onChange={(e) => handleAddressChange("street", e.target.value)}
            placeholder="Address (Area and Street)"
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              placeholder="City/District/Town"
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <input
              type="text"
              value={address.state}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              placeholder="State"
              required
              className="border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <input
            type="text"
            value={address.country}
            onChange={(e) => handleAddressChange("country", e.target.value)}
            placeholder="Country"
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value as "online")}
              />
              Online Payment
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value as "cod")}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {paymentMethod === "cod" ? "Back to Home" : "Proceed to Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
