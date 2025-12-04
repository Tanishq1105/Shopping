"use client";
import React from "react";
import Link from "next/link";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname() || "/";

  const menuItems = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  return (
    <nav
      aria-label="Seller navigation"
      className="md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col"
    >
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center py-3 px-4 gap-3 transition-colors ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                : "hover:bg-gray-100/90"
            }`}
            aria-current={isActive ? "page" : undefined}
            title={item.name}
          >
            <Image
              src={item.icon}
              alt={`${item.name} icon`}
              width={28}
              height={28}
              className="flex-shrink-0"
            />
            <span className="md:block hidden text-sm">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SideBar;
