"use client";
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();

  const safePush = (path) => {
    if (router && typeof router.push === "function") router.push(path);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      {/* LOGO */}
      <button
        type="button"
        onClick={() => safePush("/")}
        className="flex items-center gap-2"
        aria-label="Go to homepage"
      >
        <Image
          src={assets.logo}
          alt="Company logo"
          width={140}
          height={40}
          className="cursor-pointer"
        />
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            type="button"
            onClick={() => safePush("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Right side (icons / auth) */}
      <div className="flex items-center gap-4">
        {/* search icon (non-interactive here — make it a button if you want) */}
        <button
          type="button"
          aria-label="Search"
          className="hidden sm:inline-flex items-center"
        >
          <Image src={assets.search_icon} alt="search" width={18} height={18} />
        </button>

        {/* Desktop user area */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cart icon */}
          <button
            type="button"
            onClick={() => safePush("/cart")}
            aria-label="Go to cart"
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            {/* If CartIcon is a React SVG component it will render directly, otherwise use Image */}
            {typeof CartIcon === "function" ? (
              <CartIcon className="w-5 h-5" />
            ) : (
              <Image src={assets.cart_icon} alt="cart" width={20} height={20} />
            )}
          </button>

          {/* Orders icon */}
          <button
            type="button"
            onClick={() => safePush("/my-orders")}
            aria-label="My orders"
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            {typeof BagIcon === "function" ? (
              <BagIcon className="w-5 h-5" />
            ) : (
              <Image src={assets.bag_icon} alt="orders" width={20} height={20} />
            )}
          </button>

          {/* Auth */}
          {user ? (
            // Clerk's UserButton renders an avatar and profile menu. No nested MenuItems here.
            <div>
              <UserButton />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openSignIn && openSignIn()}
              className="flex items-center gap-2 hover:text-gray-900 transition"
              aria-label="Sign in or create account"
            >
              <Image src={assets.user_icon} alt="user" width={20} height={20} />
              <span className="hidden lg:inline">Account</span>
            </button>
          )}
        </div>

        {/* Mobile (md:hidden) condensed area */}
        <div className="flex md:hidden items-center gap-3">
          {isSeller && (
            <button
              type="button"
              onClick={() => safePush("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller
            </button>
          )}

          {user ? (
            // show UserButton for mobile — it provides a menu for sign-out / profile
            <UserButton />
          ) : (
            <button
              type="button"
              onClick={() => openSignIn && openSignIn()}
              className="flex items-center gap-2 hover:text-gray-900 transition"
              aria-label="Sign in"
            >
              <Image src={assets.user_icon} alt="user" width={20} height={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
