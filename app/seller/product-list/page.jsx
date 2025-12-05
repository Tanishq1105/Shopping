'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const ProductList = () => {
  // get router, auth helpers and user from context
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerProduct = async () => {
    setLoading(true);
    try {
      if (!user) {
        // user not logged in — nothing to fetch
        setProducts([]);
        return;
      }

      // getToken comes from Clerk via context; guard its existence
      const token = typeof getToken === "function" ? await getToken() : null;

      const { data } = await axios.get("/api/product/seller-list", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (data?.success) {
        setProducts(Array.isArray(data.products) ? data.products : []);
      } else {
        toast.error(data?.message ?? "Failed to fetch products");
      }
    } catch (error) {
      toast.error(error?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // only fetch when user is available
    if (user) fetchSellerProduct();
    else setLoading(false); // no user => not loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Product</h2>

          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {products.map((product) => {
                  const id = product?._id ?? product?.id ?? Math.random().toString(36).slice(2, 9);
                  const imgSrc = Array.isArray(product?.image) && product.image[0] ? product.image[0] : assets.upload_area;

                  return (
                    <tr key={id} className="border-t border-gray-500/20">
                      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                        <div className="bg-gray-500/10 rounded p-2">
                          <Image
                            src={imgSrc}
                            alt={product?.name ?? "product image"}
                            className="w-16"
                            width={64}
                            height={64}
                            // If the image might be an external URL, ensure it's allowed in next.config.js domains
                          />
                        </div>
                        <span className="truncate w-full">{product?.name ?? "Untitled product"}</span>
                      </td>

                      <td className="px-4 py-3 max-sm:hidden">{product?.category ?? "-"}</td>

                      <td className="px-4 py-3">
                        {typeof product?.offerPrice !== "undefined" ? `$${product.offerPrice}` : "-"}
                      </td>

                      <td className="px-4 py-3 max-sm:hidden">
                        <button
                          onClick={() => router?.push(`/product/${product?._id}`)}
                          className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md"
                          aria-label={`Visit ${product?.name ?? "product"} page`}
                        >
                          <span className="hidden md:block">Visit</span>
                          <Image
                            src={assets.redirect_icon}
                            alt="redirect"
                            width={18}
                            height={18}
                            className="h-3.5"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductList;
