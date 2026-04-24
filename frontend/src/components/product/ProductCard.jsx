import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice, getDiscount, truncate } from '../../utils/helpers';

export default function ProductCard({ product }) {
  const { addLocal, loading } = useCart();
  const discount = getDiscount(product.originalPrice, product.price);

  return (
    <div className="card group flex flex-col animate-slide-up">
      {/* Image */}
      <Link to={`/products/${product._id}`} className="relative overflow-hidden rounded-t-2xl bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 badge bg-accent text-white">
            -{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 badge bg-yellow-400 text-yellow-900">
            ⭐ Featured
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="badge bg-white text-slate-700 text-sm">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-accent font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </span>
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-primary text-sm leading-snug hover:text-accent transition line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted mb-3 line-clamp-2">{truncate(product.description, 70)}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className={s <= Math.round(product.rating) ? 'star' : 'text-slate-200'} style={{fontSize:'12px'}}>★</span>
            ))}
          </div>
          <span className="text-xs text-muted">({product.numReviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <span className="text-xs text-muted line-through ml-2">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button
            onClick={() => addLocal(product)}
            disabled={product.stock === 0 || loading}
            className="btn-primary text-xs py-2 px-3"
          >
            {product.stock === 0 ? 'Sold Out' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
