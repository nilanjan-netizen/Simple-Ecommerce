import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";
import OrbitingImages from "@/components/OrbitingImages"; 
import { currentUser } from "@clerk/nextjs/server";  // ✅ Clerk import

export default async function Home() {
  const user = await currentUser();   // ✅ Get logged-in user

  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 10,
  });
  console.log("Total products:", products.data.length);

  const orbitImages = [
    "/Calcutta-Fish-Fry.jpg.webp",
    "/Aam-Tel-Ilish.jpg.webp",
    "/Aloo-Posto.jpg.webp",
    "/Chingri-Malai-Curry.jpg.webp",
    "/Kolkata-Biryani.jpg.webp",
    "/Macher-Jhol-1.jpg.webp",
    "/Shorshe-Ilish.jpg.webp", // 7th center image
  ];

  return (
    <div>
      {/* ✅ Greeting with user name */}
     

      <section className="relative rounded bg-neutral-100 py-12 sm:py-16">
        <div className="relative mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-8 sm:px-16">
          
          {/* LEFT CONTENT */}
          <div className="max-w-md space-y-4 text-center md:text-left z-10">
           
            <h3 className="text-5xl font-semibold text-neutral-800">
              {user ? `Hello, ${user.firstName || user.username || "User"} 👋` : "Hello, Guest 👋"}
            </h3>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              স্বাগতম আমাদের রেস্টুরেন্টে
            </h2>
            <p className="text-neutral-600">
              আসল বাঙালি স্বাদের খোঁজে চলে আসুন আমাদের রান্নাঘরে।  
              ইলিশ, ভেটকি ফ্রাই, মাটন বিরিয়ানি সহ আরও অনেক কিছু!
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link href="/products">আমাদের মেনু(MENU) দেখুন</Link>
            </Button>
          </div>

          {/* RIGHT CONTENT - hero image */}
          <div className="flex items-center justify-end z-10 pr-8"> 
            <Image
              alt="Hero Image"
              src={products.data[0].images[0]}
              className="rounded-2xl shadow-2xl transform transition duration-700 hover:scale-110 hover:rotate-3 hover:shadow-3xl"
              width={420}
              height={420}
            />
          </div>

          {/* ORBITING IMAGES WITH FIXED CENTER IMAGE */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <OrbitingImages 
              images={orbitImages.slice(0, 6)}
              centerImage={orbitImages[6]}
            />
          </div>
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
