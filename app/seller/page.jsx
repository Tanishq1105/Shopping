'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  const { getToken } = useAppContext() ?? {};
  const [files, setFiles] = useState([null, null, null, null]); // fixed slots
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [loading, setLoading] = useState(false);

  // keep track of created preview URLs so we can revoke them
  const [previewUrls, setPreviewUrls] = useState([null, null, null, null]);

  useEffect(() => {
    return () => {
      // revoke any object URLs on unmount
      previewUrls.forEach((u) => {
        if (u) URL.revokeObjectURL(u);
      });
    };
  }, [previewUrls]);

  const handleFileChange = (index, file) => {
    // revoke old preview for this index
    setPreviewUrls((prev) => {
      const next = [...prev];
      if (next[index]) {
        URL.revokeObjectURL(next[index]);
      }
      next[index] = file ? URL.createObjectURL(file) : null;
      return next;
    });

    setFiles((prev) => {
      const next = [...prev];
      next[index] = file ?? null;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      // append numeric values as strings (FormData stores strings/blobs)
      formData.append('price', String(Number(price || 0)));
      formData.append('offerPrice', String(Number(offerPrice || 0)));

      files.forEach((f) => {
        if (f) formData.append('images', f);
      });

      const token = typeof getToken === "function" ? await getToken() : null;

      const { data } = await axios.post('/api/product/add', formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          // let axios set content-type boundary for FormData
        },
      });

      if (data?.success) {
        toast.success(data.message ?? 'Product added');
        // cleanup previews and inputs
        previewUrls.forEach((u) => u && URL.revokeObjectURL(u));
        setPreviewUrls([null, null, null, null]);
        setFiles([null, null, null, null]);
        setName('');
        setDescription('');
        setCategory('Earphone');
        setPrice('');
        setOfferPrice('');
      } else {
        toast.error(data?.message ?? 'Failed to add product');
      }
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[0, 1, 2, 3].map((index) => (
              <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                <input
                  onChange={(e) => handleFileChange(index, e.target.files?.[0] ?? null)}
                  type="file"
                  id={`image${index}`}
                  accept="image/*"
                  hidden
                />

                {/* show blob preview if selected, otherwise show upload placeholder */}
                {previewUrls[index] ? (
                  // use native img for blob/objectURL previews
                  // alt text for accessibility
                  // note: layout sizes can be adjusted
                  // using inline styles for consistent size
                  <img
                    src={previewUrls[index]}
                    alt={`Preview ${index + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                    className="rounded"
                  />
                ) : (
                  <Image
                    key={index}
                    className="max-w-24"
                    src={assets.upload_area}
                    alt={`Upload ${index + 1}`}
                    width={100}
                    height={100}
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-2.5 bg-orange-600 text-white font-medium rounded ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
