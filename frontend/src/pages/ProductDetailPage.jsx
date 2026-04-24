import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { formatPrice, getDiscount } from '../utils/helpers';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addLocal } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10 animate-pulse">
        <div className="h-96 bg-slate-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-12 bg-slate-200 rounded mt-8" />
        </div>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="text-center py-24">
      <p className="text-5xl mb-4">😕</p>
      <p className="text-lg font-semibold text-primary mb-2">Product not found</p>
      <Link to="/products" className="btn-primary mt-4 inline-block">← Back to Products</Link>
    </div>
  );

  const discount = getDiscount(product.originalPrice, product.price);
  const images = product.images?.length ? [product.image, ...product.images] : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-6 flex gap-2">
        <Link to="/" className="hover:text-accent transition">Home</Link>
        <span>›</span>
        <Link to="/products" className="hover:text-accent transition">Products</Link>
        <span>›</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-accent transition">{product.category}</Link>
        <span>›</span>
        <span className="text-primary line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-slate-50 mb-3">
            <img
              src={images[activeImg]}
              alt={product.name}
              className="w-full h-96 object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    activeImg === i ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="badge bg-accent/10 text-accent mb-3">{product.category}</span>
          <h1 className="text-2xl md:text-3xl font-display text-primary mb-2">{product.name}</h1>
          <p className="text-muted text-sm mb-1">Brand: <span className="font-semibold text-primary">{product.brand}</span></p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className={s <= Math.round(product.rating) ? 'star text-lg' : 'text-slate-200 text-lg'}>★</span>
              ))}
            </div>
            <span className="text-sm text-muted">{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-muted line-through">{formatPrice(product.originalPrice)}</span>
                <span className="badge bg-green-100 text-green-700">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium text-sm">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-500 font-medium text-sm">✗ Out of Stock</span>
            )}
          </div>

          {/* Qty + Add */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 transition text-lg"
                >−</button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 transition text-lg"
                >+</button>
              </div>
              <button
                onClick={() => addLocal(product, qty)}
                className="btn-primary flex-1 py-3"
              >
                🛒 Add to Cart
              </button>
            </div>
          )}

          {/* Features */}
          <div className="border-t border-slate-100 pt-6 grid grid-cols-2 gap-3">
            {['🚚 Free shipping over ₹499', '↩️ 30-day returns', '🔒 Secure checkout', '⭐ Genuine products'].map((f) => (
              <span key={f} className="text-xs text-muted">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
