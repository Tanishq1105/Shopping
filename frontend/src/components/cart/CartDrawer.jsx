import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';

export default function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, updateQty, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  if (!drawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-primary">
            🛒 Cart <span className="text-muted font-normal text-sm">({totalItems} items)</span>
          </h2>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-500"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🛒</p>
              <p className="font-semibold text-primary mb-1">Your cart is empty</p>
              <p className="text-sm text-muted">Add some products to get started!</p>
              <button
                onClick={() => { setDrawerOpen(false); navigate('/products'); }}
                className="btn-primary mt-6 text-sm"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-slate-50"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary line-clamp-2">{item.name}</p>
                  <p className="text-accent font-semibold text-sm mt-0.5">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center
                                 text-sm hover:bg-slate-100 transition"
                    >–</button>
                    <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      disabled={item.qty >= item.stock}
                      className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center
                                 text-sm hover:bg-slate-100 transition disabled:opacity-40"
                    >+</button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-auto text-red-400 hover:text-red-600 text-xs transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-6 py-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted text-sm">Subtotal</span>
              <span className="font-bold text-lg text-primary">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted">Shipping & taxes calculated at checkout</p>
            <button
              onClick={() => { setDrawerOpen(false); navigate('/checkout'); }}
              className="btn-primary w-full py-3 text-center"
            >
              Proceed to Checkout →
            </button>
            <button
              onClick={() => { setDrawerOpen(false); navigate('/cart'); }}
              className="w-full text-center text-sm text-accent hover:underline"
            >
              View Full Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
