import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-6 md:px-10 py-6">
        <div className="flex items-center gap-4">
          {/* Logo (click scrolls to top) */}
          <button
            type="button"
            aria-label="Go to top"
            onClick={() =>
              typeof window !== "undefined" &&
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex items-center"
          >
            <Image
              src={assets.logo}
              alt="Shopping logo"
              width={140}
              height={40}
              priority={false}
              className="hidden md:block"
            />
          </button>

          <div className="hidden md:block h-7 w-px bg-gray-500/60" />

          <p className="py-4 text-center text-xs md:text-sm text-gray-500">
            Copyright {year} © Shopping. All Rights Reserved.
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3 pb-3 md:pb-0">
          <a
            href="#"
            aria-label="Facebook"
            className="inline-flex items-center"
          >
            <Image
              src={assets.facebook_icon}
              alt="Facebook"
              width={20}
              height={20}
            />
          </a>

          <a
            href="#"
            aria-label="Twitter"
            className="inline-flex items-center"
          >
            <Image
              src={assets.twitter_icon}
              alt="Twitter"
              width={20}
              height={20}
            />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="inline-flex items-center"
          >
            <Image
              src={assets.instagram_icon}
              alt="Instagram"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
