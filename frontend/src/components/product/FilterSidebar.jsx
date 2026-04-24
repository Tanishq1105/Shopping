const CATEGORIES = ['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty', 'Toys', 'Other'];
const SORTS = [
  { value: 'newest',     label: '🆕 Newest' },
  { value: 'price_asc',  label: '💲 Price: Low to High' },
  { value: 'price_desc', label: '💰 Price: High to Low' },
  { value: 'rating',     label: '⭐ Top Rated' },
];

export default function FilterSidebar({ filters, onChange }) {
  const set = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <aside className="w-full space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-widest">Category</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => set('category', '')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
              ${!filters.category ? 'bg-accent text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            All Categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => set('category', c)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
                ${filters.category === c ? 'bg-accent text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-widest">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => set('minPrice', e.target.value)}
            className="input text-sm py-2"
          />
          <span className="text-muted text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => set('maxPrice', e.target.value)}
            className="input text-sm py-2"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-widest">Sort By</h3>
        <div className="space-y-1.5">
          {SORTS.map((s) => (
            <button
              key={s.value}
              onClick={() => set('sort', s.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
                ${filters.sort === s.value ? 'bg-accent text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => onChange({ page: 1 })}
        className="w-full btn-outline text-sm py-2"
      >
        Reset Filters
      </button>
    </aside>
  );
}
