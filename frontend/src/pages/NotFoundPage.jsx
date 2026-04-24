import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center animate-fade-in">
      <div>
        <p className="text-8xl font-display font-bold text-slate-100">404</p>
        <h1 className="text-2xl font-semibold text-primary -mt-4 mb-2">Page not found</h1>
        <p className="text-muted mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  );
}
