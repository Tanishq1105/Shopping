import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-accent text-xl font-display font-bold">Shop</span>
              <span className="text-white text-xl font-display font-bold">Verse</span>
            </div>
            <p className="text-sm leading-relaxed">Your one-stop destination for everything you need, delivered fast.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-2 text-sm">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books'].map((c) => (
                <li key={c}><Link to={`/products?category=${c}`} className="hover:text-accent transition">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login"    className="hover:text-accent transition">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-accent transition">Register</Link></li>
              <li><Link to="/orders"   className="hover:text-accent transition">My Orders</Link></li>
              <li><Link to="/cart"     className="hover:text-accent transition">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-accent transition cursor-default">About Us</span></li>
              <li><span className="hover:text-accent transition cursor-default">Privacy Policy</span></li>
              <li><span className="hover:text-accent transition cursor-default">Returns</span></li>
              <li><span className="hover:text-accent transition cursor-default">Contact</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} ShopVerse. Built with React, Node.js & MongoDB.
        </div>
      </div>
    </footer>
  );
}
