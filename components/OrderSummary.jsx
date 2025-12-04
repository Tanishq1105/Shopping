import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const dropdownRef = useRef(null);

  // Safe getter for cart amount/count
  const safeCartAmount = () => {
    try {
      const amt = typeof getCartAmount === "function" ? getCartAmount() : getCartAmount;
      return Number(amt) || 0;
    } catch {
      return 0;
    }
  };

  const fetchUserAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const token = (typeof getToken === "function" && (await getToken())) || null;
      // If no token, fall back to dummy data
      if (!token) {
        setUserAddresses(addressDummyData ?? []);
        if ((addressDummyData ?? []).length > 0) setSelectedAddress(addressDummyData[0]);
        setLoadingAddresses(false);
        return;
      }

      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // expect data.addresses (array). fallback to dummy if needed
      if (data && data.success) {
        const addresses = Array.isArray(data.addresses) ? data.addresses : [];
        setUserAddresses(addresses.length ? addresses : addressDummyData ?? []);
        if (addresses.length) {
          setSelectedAddress(addresses[0]);
        } else if ((addressDummyData ?? []).length) {
          setSelectedAddress(addressDummyData[0]);
        }
      } else {
        // If backend returns no addresses, fallback to dummy
        setUserAddresses(addressDummyData ?? []);
        if ((addressDummyData ?? []).length) setSelectedAddress(addressDummyData[0]);
        if (data && data.message) toast.error(data.message);
      }
    } catch (error) {
      // network / server error -> fallback to dummy addresses
      setUserAddresses(addressDummyData ?? []);
      if ((addressDummyData ?? []).length) setSelectedAddress(addressDummyData[0]);
      toast.error(error?.message || "Failed to fetch addresses");
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (creatingOrder) return;
      if (!selectedAddress) return toast.error("Please select an address");

      // build items array
      let cartItemsArray = Object.keys(cartItems ?? {}).map((key) => ({
        product: key,
        quantity: cartItems[key],
      }));
      cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0);

      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty");
      }

      setCreatingOrder(true);

      const token = (typeof getToken === "function" && (await getToken())) || null;
      if (!token) {
        toast.error("You must be logged in to place an order");
        setCreatingOrder(false);
        return;
      }

      const { data } = await axios.post(
        "/api/order/create",
        {
          address: selectedAddress._id,
          items: cartItemsArray,
          promoCode: promoCode || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data && data.success) {
        toast.success(data.message || "Order placed");
        setCartItems({});
        // navigate to order placed page
        router.push("/order-placed");
      } else {
        toast.error((data && data.message) || "Failed to create order");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setCreatingOrder(false);
    }
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // fetch addresses when user becomes available
  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    } else {
      // if no user, still load dummy addresses to let user proceed as guest
      setUserAddresses(addressDummyData ?? []);
      if ((addressDummyData ?? []).length) setSelectedAddress(addressDummyData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // derived values
  const itemsCount = typeof getCartCount === "function" ? getCartCount() : getCartCount ?? 0;
  const cartAmount = safeCartAmount();
  const tax = Math.floor(cartAmount * 0.02);
  const total = cartAmount + tax;

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">Order Summary</h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>

          <div ref={dropdownRef} className="relative inline-block w-full text-sm">
            <button
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none border"
              onClick={() => setIsDropdownOpen((s) => !s)}
              type="button"
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul
                role="listbox"
                className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5 max-h-64 overflow-auto"
              >
                {loadingAddresses ? (
                  <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
                ) : userAddresses && userAddresses.length > 0 ? (
                  userAddresses.map((address, index) => (
                    <li
                      key={address._id ?? index}
                      role="option"
                      aria-selected={selectedAddress?._id === address._id}
                      className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddressSelect(address);
                      }}
                    >
                      {address.fullName}, {address.area}, {address.city}, {address.state}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">No addresses found</li>
                )}

                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(false);
                    router.push("/add-address");
                  }}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center text-sm"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">Promo Code</label>
          <div className="flex flex-col items-start gap-3">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
              aria-label="Promo code"
            />
            <button
              type="button"
              onClick={() => {
                // placeholder: implement promo validation logic here
                if (!promoCode.trim()) return toast.error("Enter a promo code");
                toast.success("Promo applied (demo)");
              }}
              className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700"
            >
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {itemsCount}</p>
            <p className="text-gray-800">
              {currency}
              {cartAmount}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {tax}
            </p>
          </div>

          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {total}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700 disabled:opacity-60"
        disabled={creatingOrder}
        type="button"
      >
        {creatingOrder ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
