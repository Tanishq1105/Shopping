import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const CATEGORIES = [
  { name: 'Electronics', emoji: '📱', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
  { name: 'Fashion',     emoji: '👗', color: 'bg-pink-50 text-pink-600 hover:bg-pink-100' },
  { name: 'Home & Kitchen', emoji: '🏠', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
  { name: 'Sports',      emoji: '⚽', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
  { name: 'Books',       emoji: '📚', color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' },
  { name: 'Beauty',      emoji: '💄', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
  { name: 'Toys',        emoji: '🧸', color: 'bg-red-50 text-red-600 hover:bg-red-100' },
  { name: 'Other',       emoji: '🎁', color: 'bg-slate-50 text-slate-600 hover:bg-slate-100' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { products: featured, loading, error } = useProducts({ featured: true, limit: 8 });

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?keyword=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #f97316 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-2xl">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              🔥 Exclusive Deals Every Day
            </p>
            <h1 className="text-4xl md:text-6xl font-display text-white leading-tight mb-4">
              Shop Everything,<br />
              <span className="text-accent">Anywhere.</span>
            </h1>
            <p className="text-white/60 text-lg mb-8">
              Discover millions of products from top brands. Fast delivery, easy returns.
            </p>
            <form onSubmit={handleSearch} className="flex gap-3 max-w-lg">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products, brands…"
                className="flex-1 bg-white/10 text-white placeholder-white/40 border border-white/20
                           rounded-xl px-5 py-3.5 focus:outline-none focus:bg-white/15 focus:border-accent transition"
              />
              <button type="submit" className="btn-primary px-6">Search</button>
            </form>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm text-muted font-medium">
            {['🚚 Free Shipping over ₹499', '↩️ Easy 30-Day Returns', '🔒 Secure Payments', '⭐ Millions of Reviews'].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display text-primary">Shop by Category</h2>
          <Link to="/products" className="text-accent text-sm font-medium hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition cursor-pointer ${cat.color}`}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display text-primary">⭐ Featured Products</h2>
          <Link to="/products" className="text-accent text-sm font-medium hover:underline">View all →</Link>
        </div>
        <ProductGrid products={featured} loading={loading} error={error} />
      </section>

      {/* Banner CTA */}
      <section className="bg-accent mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-3xl mb-16 overflow-hidden">
        <div className="px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-display mb-2">Ready to explore more?</h2>
            <p className="text-white/80">Browse our full catalogue of thousands of products.</p>
          </div>
          <Link to="/products" className="bg-white text-accent font-bold px-8 py-3.5 rounded-xl hover:shadow-xl
                                          hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap">
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
