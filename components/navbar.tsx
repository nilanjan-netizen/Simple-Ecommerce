"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 shadow-md backdrop-blur-lg border-b border-red-100">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* 🍲 Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-500 drop-shadow-lg"
        >
          ঐতিহ্য | Heritage Bengali Cloud Kitchen
        </Link>

        {/* 🧾 Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-bold text-xl">
          <Link
            href="/"
            className="relative px-4 py-2 text-gray-800 hover:text-red-600 transition group"
          >
            হোম | Home
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            href="/products"
            className="relative px-4 py-2 text-gray-800 hover:text-green-600 transition group"
          >
            মেনু | Menu
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            href="/checkout"
            className="relative px-4 py-2 text-gray-800 hover:text-blue-600 transition group"
          >
            অর্ডার | Checkout
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            href="/Contact"
            className="relative px-4 py-2 text-gray-800 hover:text-purple-600 transition group"
          >
            যোগাযোগ | Contact
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Admin Dashboard */}
          <SignedIn>
            <Link
              href="/Admin"
              className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white hover:scale-105 transition shadow-md"
            >
              ড্যাশবোর্ড | Admin Dashboard
            </Link>
          </SignedIn>
        </div>

       
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link href="/checkout" className="relative group">
            <ShoppingCartIcon className="h-7 w-7 text-gray-700 group-hover:text-red-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          <SignedOut>
            <Link
              href="/sign-in"
              className="px-4 py-1.5 rounded-md bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-red-600 transition shadow-sm text-lg"
            >
              লগইন | Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 shadow-md transition text-lg"
            >
              রেজিস্টার | Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-7 w-7 text-gray-700" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-gray-700" />
            )}
          </Button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-lg border-t border-gray-100 animate-slide-down">
          <ul className="flex flex-col p-4 space-y-3 font-bold text-xl">
            <li>
              <Link
                href="/"
                className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-600 transition"
              >
                হোম | Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="block px-3 py-2 rounded-md hover:bg-green-50 hover:text-green-600 transition"
              >
                মেনু | Menu
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="block px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
              >
                অর্ডার | Checkout
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md hover:bg-purple-50 hover:text-purple-600 transition"
              >
                যোগাযোগ | Contact
              </Link>
            </li>

            {/* Admin Dashboard */}
            <SignedIn>
              <li>
                <Link
                  href="/Admin"
                  className="block px-3 py-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white hover:scale-105 shadow transition"
                >
                  ড্যাশবোর্ড | Admin
                </Link>
              </li>
            </SignedIn>
          </ul>
        </nav>
      )}
    </nav>
  );
};
