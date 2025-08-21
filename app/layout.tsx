import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs"; 
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Cloud Kitchen 🍴",
  description: "Delicious Bengali & Indian Dishes at your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> 
      <html lang="en">
        <body className="flex min-h-full flex-col bg-white">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
