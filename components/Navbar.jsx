"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { isSeller, user } = useAppContext();

  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => setMounted(true), []);

  const safePush = (path) => {
    if (router && typeof router.push === "function") router.push(path);
    else if (typeof window !== "undefined") window.location.href = path;
  };

  const handleAccount = () => {
    if (user) return; // UserButton will handle click
    if (openSignIn) openSignIn();
    else safePush("/sign-in");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    safePush(`/all-products?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 relative z-50">
      
      {/* LOGO */}
      <button onClick={() => safePush("/")} aria-label="Go to homepage">
        <Image
          src={assets.logo}
          alt="Company logo"
          width={140}
          height={40}
          style={{ width: "auto", height: "auto" }}
          className="cursor-pointer"
          priority
        />
      </button>

      {/* NAVIGATION LINKS (Desktop only) */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/about" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>

        {isSeller && (
          <button
            onClick={() => safePush("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* RIGHT SIDE — SEARCH + ACCOUNT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative">
          <button
            className="hidden sm:inline-flex p-2 hover:bg-gray-100 rounded-md"
            aria-label="Search"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <Image
              src={assets.search_icon}
              alt="search"
              width={18}
              height={18}
              style={{ width: "auto", height: "auto" }}
            />
          </button>

          {mounted && searchOpen && (
            <form
              onSubmit={submitSearch}
              className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-md p-2 z-50"
            >
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 px-2 py-1 border rounded text-sm outline-none"
                />
                <button type="submit" className="px-3 py-1 bg-indigo-600 text-white text-sm rounded">
                  Go
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ACCOUNT (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {mounted ? (
            user ? (
              <UserButton />
            ) : (
              <button
                type="button"
                onClick={handleAccount}
                className="flex items-center gap-2 hover:text-gray-900 transition"
              >
                <Image
                  src={assets.user_icon}
                  alt="user"
                  width={20}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                />
                <span className="hidden lg:inline">Account</span>
              </button>
            )
          ) : (
            <div className="hidden md:flex items-center gap-2 opacity-0">
              <div style={{ width: 20, height: 20 }} />
              <span>Account</span>
            </div>
          )}
        </div>

        {/* MOBILE ACCOUNT */}
        <div className="flex md:hidden items-center gap-3">
          {user ? (
            <UserButton />
          ) : (
            <button
              type="button"
              onClick={handleAccount}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image
                src={assets.user_icon}
                alt="user"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
