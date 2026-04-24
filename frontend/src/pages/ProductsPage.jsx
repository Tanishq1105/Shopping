import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/product/FilterSidebar';
import { useProducts } from '../hooks/useProducts';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    keyword:  searchParams.get('keyword')  || '',
    category: searchParams.get('category') || '',
    sort:     '',
    minPrice: '',
    maxPrice: '',
    page:     1,
    limit:    12,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { products, loading, error, pages, total, fetchProducts } = useProducts();

  useEffect(() => {
    const clean = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined));
    fetchProducts(clean);
  }, [filters]);

  // Sync URL params on mount
  useEffect(() => {
    const kw = searchParams.get('keyword');
    const cat = searchParams.get('category');
    if (kw || cat) setFilters((f) => ({ ...f, keyword: kw || '', category: cat || '' }));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-primary">
            {filters.category || 'All Products'}
          </h1>
          {!loading && (
            <p className="text-sm text-muted mt-0.5">{total.toLocaleString()} products found</p>
          )}
        </div>
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="md:hidden btn-outline text-sm py-2 px-4"
        >
          ⚙ Filters
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          value={filters.keyword}
          onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value, page: 1 }))}
          placeholder="Search products…"
          className="input max-w-md"
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop always visible, mobile toggle */}
        <div className={`w-56 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Products + pagination */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={products} loading={loading} error={error} />

          {/* Pagination */}
          {pages > 1 && !loading && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                disabled={filters.page === 1}
                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                className="btn-outline text-sm py-2 px-4 disabled:opacity-40"
              >
                ← Prev
              </button>
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setFilters((f) => ({ ...f, page: i + 1 }))}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
                    filters.page === i + 1
                      ? 'bg-accent text-white'
                      : 'border border-slate-200 hover:border-accent hover:text-accent'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={filters.page === pages}
                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                className="btn-outline text-sm py-2 px-4 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
