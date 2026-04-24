import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const TAX = totalPrice * 0.18;
  const SHIPPING = totalPrice > 499 ? 0 : 49;
  const TOTAL = totalPrice + TAX + SHIPPING;

  if (items.length === 0) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center animate-fade-in">
      <p className="text-6xl mb-5">🛒</p>
      <h2 className="text-2xl font-display text-primary mb-2">Your cart is empty</h2>
      <p className="text-muted mb-8">Looks like you haven't added anything yet.</p>
      <Link to="/products" className="btn-primary">Start Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-primary">Shopping Cart ({totalItems})</h1>
        <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition">
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="card p-4 flex gap-4">
              <Link to={`/products/${item.productId}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl bg-slate-50 flex-shrink-0"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/96'; }}
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.productId}`}>
                  <h3 className="font-semibold text-primary hover:text-accent transition line-clamp-2">{item.name}</h3>
                </Link>
                <p className="text-accent font-bold text-lg mt-1">{formatPrice(item.price)}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition"
                    >−</button>
                    <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      disabled={item.qty >= item.stock}
                      className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition disabled:opacity-40"
                    >+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">{formatPrice(item.price * item.qty)}</span>
                    <button onClick={() => removeItem(item.productId)} className="text-red-400 hover:text-red-600 transition text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-primary mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-primary font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>GST (18%)</span>
                <span className="text-primary font-medium">{formatPrice(TAX)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className={SHIPPING === 0 ? 'text-green-600 font-medium' : 'text-primary font-medium'}>
                  {SHIPPING === 0 ? 'FREE' : formatPrice(SHIPPING)}
                </span>
              </div>
              {SHIPPING === 0 && (
                <p className="text-xs text-green-600">🎉 You qualify for free shipping!</p>
              )}
            </div>
            <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-accent">{formatPrice(TOTAL)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full mt-5 py-3"
            >
              Proceed to Checkout →
            </button>
            <Link to="/products" className="block text-center text-sm text-accent mt-3 hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
