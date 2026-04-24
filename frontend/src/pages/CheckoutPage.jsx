import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';
import api from '../utils/api';

const STEPS = ['Shipping', 'Review', 'Confirmation'];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({
    street: '', city: '', state: '', zip: '', country: 'India',
    paymentMethod: 'Card',
  });

  const TAX = totalPrice * 0.18;
  const SHIPPING = totalPrice > 499 ? 0 : 49;
  const TOTAL = totalPrice + TAX + SHIPPING;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        name: i.name, qty: i.qty, image: i.image, price: i.price, product: i.productId,
      }));
      const { data } = await api.post('/orders', {
        orderItems,
        shippingAddress: { street: form.street, city: form.city, state: form.state, zip: form.zip, country: form.country },
        paymentMethod: form.paymentMethod,
      });
      setOrderId(data.data._id);
      clearCart();
      setStep(2);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 2) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <h1 className="text-2xl font-display text-primary mb-8">Checkout</h1>

      {/* Progress */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
              ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-accent text-white' : 'bg-slate-200 text-muted'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium hidden sm:block ${i === step ? 'text-primary' : 'text-muted'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-green-500' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 0: Shipping */}
      {step === 0 && (
        <div className="card p-6 animate-slide-up">
          <h2 className="font-semibold text-primary mb-5">Shipping Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1.5">Street Address</label>
              <input name="street" value={form.street} onChange={handleChange} className="input" placeholder="123 Main St" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="input" placeholder="Mumbai" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="input" placeholder="Maharashtra" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">PIN Code</label>
              <input name="zip" value={form.zip} onChange={handleChange} className="input" placeholder="400001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Country</label>
              <input name="country" value={form.country} onChange={handleChange} className="input" />
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-primary mb-2">Payment Method</label>
            <div className="flex gap-3">
              {['Card', 'UPI', 'COD'].map((pm) => (
                <label key={pm} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition
                  ${form.paymentMethod === pm ? 'border-accent bg-accent/5' : 'border-slate-200 hover:border-slate-300'}`}>
                  <input type="radio" name="paymentMethod" value={pm}
                    checked={form.paymentMethod === pm} onChange={handleChange} className="sr-only" />
                  <span className="text-sm font-medium">{pm}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={() => { if (form.street && form.city && form.zip) setStep(1); }}
            className="btn-primary w-full mt-6 py-3"
          >
            Continue to Review →
          </button>
        </div>
      )}

      {/* Step 1: Review */}
      {step === 1 && (
        <div className="space-y-4 animate-slide-up">
          <div className="card p-5">
            <h2 className="font-semibold text-primary mb-3">Order Items</h2>
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 py-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg bg-slate-50" />
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted">Qty: {item.qty}</p>
                  </div>
                  <span className="font-semibold text-sm">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold text-primary mb-3">Shipping To</h2>
            <p className="text-sm text-slate-600">{form.street}, {form.city}, {form.state} {form.zip}, {form.country}</p>
            <p className="text-sm text-muted mt-1">Payment: {form.paymentMethod}</p>
          </div>

          <div className="card p-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted"><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
              <div className="flex justify-between text-muted"><span>GST (18%)</span><span>{formatPrice(TAX)}</span></div>
              <div className="flex justify-between text-muted"><span>Shipping</span><span>{SHIPPING === 0 ? 'FREE' : formatPrice(SHIPPING)}</span></div>
              <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                <span>Total</span><span className="text-accent">{formatPrice(TOTAL)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="btn-outline flex-1 py-3">← Back</button>
            <button onClick={placeOrder} disabled={loading} className="btn-primary flex-1 py-3">
              {loading ? 'Placing Order…' : '🎉 Place Order'}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Confirmation */}
      {step === 2 && (
        <div className="card p-10 text-center animate-slide-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-display text-primary mb-2">Order Placed!</h2>
          <p className="text-muted mb-1">Your order has been successfully placed.</p>
          {orderId && <p className="text-xs text-muted font-mono mt-1">Order ID: {orderId}</p>}
          <div className="flex gap-3 justify-center mt-8">
            <button onClick={() => navigate('/orders')} className="btn-primary">View My Orders</button>
            <button onClick={() => navigate('/products')} className="btn-outline">Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
}
