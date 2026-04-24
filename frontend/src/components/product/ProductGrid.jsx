import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading, error }) {
  if (loading) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="h-52 bg-slate-200 rounded-t-2xl" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-full" />
            <div className="h-8 bg-slate-200 rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );

  if (error) return (
    <div className="text-center py-16">
      <p className="text-4xl mb-3">⚠️</p>
      <p className="text-red-500 font-medium">{error}</p>
    </div>
  );

  if (!products?.length) return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">🔍</p>
      <p className="text-lg font-semibold text-primary mb-2">No products found</p>
      <p className="text-muted text-sm">Try different filters or search terms</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}
