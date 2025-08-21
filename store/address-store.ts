// address-store.ts
export type Address = {
  name: string;
  phone: string;
  postalCode: string;
  street: string;
  city: string;
  state: string;
  country: string;
  createdAt?: string;
};

export function getAddresses(): Address[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("checkout_addresses") || "[]");
}

export function saveAddress(address: Address) {
  if (typeof window === "undefined") return;

  const existing = getAddresses();
  const newAddress = { ...address, createdAt: new Date().toISOString() };

  existing.unshift(newAddress);
  const lastFive = existing.slice(0, 5);

  localStorage.setItem("checkout_addresses", JSON.stringify(lastFive));
}

export function saveOrder(
  items: any[],
  address: Address,
  total: number,
  method: "COD" | "Online",
  payment: "Pending" | "Paid"
) {
  if (typeof window === "undefined") return;

  const storedOrders = sessionStorage.getItem("orders");
  const orders = storedOrders ? JSON.parse(storedOrders) : [];

  const newOrder = {
    product: items.map((i) => `${i.name} x${i.quantity}`).join(", "),
    quantity: items.reduce((acc, i) => acc + i.quantity, 0),
    customer: `${address.name}, ${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}\nPhone: ${address.phone}`,
    amount: total / 100, // cents → dollars
    method,  // 👈 now dynamic
    date: new Date().toLocaleDateString(),
    payment, // 👈 now dynamic
  };

  orders.unshift(newOrder);
  sessionStorage.setItem("orders", JSON.stringify(orders.slice(0, 10))); // max 10 orders
}
export function clearAddresses() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("checkout_addresses");
}