import { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import { getErrorMsg } from '../utils/helpers';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await api.get('/cart');
      setItems(data.data);
    } catch { /* not logged in */ }
  }, []);

  const addToCart = useCallback(async (productId, qty = 1) => {
    setLoading(true);
    try {
      const { data } = await api.post('/cart', { productId, qty });
      setItems(data.data);
      setDrawerOpen(true);
    } catch (err) {
      alert(getErrorMsg(err));
    } finally { setLoading(false); }
  }, []);

  // Local-only version for guests (no auth required for demo)
  const addLocal = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.productId === product._id);
      if (ex) return prev.map((i) => i.productId === product._id ? { ...i, qty: Math.min(i.qty + qty, i.stock) } : i);
      return [...prev, { productId: product._id, name: product.name, image: product.image, price: product.price, stock: product.stock, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setItems((prev) => prev.map((i) => i.productId === productId ? { ...i, qty } : i));
    }
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((a, i) => a + i.qty, 0);
  const totalPrice = items.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, loading, drawerOpen, setDrawerOpen,
      fetchCart, addToCart, addLocal, updateQty, removeItem, clearCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
