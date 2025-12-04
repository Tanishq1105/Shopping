import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Brand */}
          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={() => typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Go to top"
              className="inline-flex items-center"
            >
              <Image src={assets.logo} alt="Shopping logo" width={140} height={40} />
            </button>

            <p className="mt-6 text-sm text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the
              industry's standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex-1 min-w-0 flex items-start md:justify-center">
            <div>
              <h2 className="font-medium text-gray-900 mb-5">Company</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/" className="hover:underline transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline transition">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline transition">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline transition">
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="flex-1 min-w-0 flex items-start md:justify-center">
            <div>
              <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
              <div className="text-sm space-y-2 text-gray-600">
                <p>
                  <a href="tel:+911234567890" className="hover:underline">
                    +91-1234567890
                  </a>
                </p>
                <p>
                  <a href="mailto:contact@shopping.com" className="hover:underline">
                    contact@shopping.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-4 text-center text-xs md:text-sm text-gray-500">
        <p>
          Copyright {year} © Shopping. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
