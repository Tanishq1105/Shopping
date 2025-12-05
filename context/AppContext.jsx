'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();

  const { user } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});

  /* ----------------------------- FETCH PRODUCTS ---------------------------- */
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ------------------------------- FETCH USER ------------------------------ */
  const fetchUserData = async () => {
    try {
      if (!user) return;

      const role = user?.publicMetadata?.role;
      setIsSeller(role === "seller");

      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user.cartItems ?? {});
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------------------- ADD TO CART ---------------------------- */
  const addToCart = async (itemId) => {
    const newCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(newCart);

    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData: newCart },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        toast.error(error.message);
        return;
      }
    }

    toast.success("Item added to cart");
  };

  /* ------------------------- UPDATE CART QUANTITY ------------------------- */
  const updateCartQuantity = async (itemId, quantity) => {
    const newCart = { ...cartItems };

    if (quantity === 0) delete newCart[itemId];
    else newCart[itemId] = quantity;

    setCartItems(newCart);

    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData: newCart },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Cart updated");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  /* ------------------------------- CART COUNT ------------------------------ */
  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  /* ------------------------------- CART AMOUNT ----------------------------- */
  const getCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue; // prevent crash
      total += (product.offerPrice || 0) * cartItems[id];
    }

    return Math.round(total * 100) / 100;
  };

  /* ----------------------------- EFFECT TRIGGERS --------------------------- */
  useEffect(() => {
    if (user) fetchProductData();
  }, [user]);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  const value = {
    user,
    getToken,
    currency,
    router,
    isSeller,
    userData,
    products,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    fetchProductData,
    fetchUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
