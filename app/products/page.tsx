


import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  // Fetch all products (up to 100 at once)
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 100, // adjust as needed
  });

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        The Traditional Bengali Cuisines WE offer:
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
