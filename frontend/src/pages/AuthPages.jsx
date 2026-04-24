import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from || '/';
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form.email, form.password);
    if (ok) navigate(redirect);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-baseline gap-1">
            <span className="text-accent text-2xl font-display font-bold">Shop</span>
            <span className="text-primary text-2xl font-display font-bold">Verse</span>
          </Link>
          <h1 className="text-xl font-semibold text-primary mt-4">Welcome back</h1>
          <p className="text-muted text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => { setError(null); setForm({ ...form, email: e.target.value }); }}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => { setError(null); setForm({ ...form, password: e.target.value }); }}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:underline font-medium">Register</Link>
          </p>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-muted space-y-1">
            <p><strong>Demo Admin:</strong> admin@shopverse.com / admin123</p>
            <p><strong>Demo User:</strong> john@example.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { register, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setValidationError('Passwords do not match'); return; }
    if (form.password.length < 6) { setValidationError('Password must be at least 6 characters'); return; }
    setValidationError('');
    const ok = await register(form.name, form.email, form.password);
    if (ok) navigate('/');
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-baseline gap-1">
            <span className="text-accent text-2xl font-display font-bold">Shop</span>
            <span className="text-primary text-2xl font-display font-bold">Verse</span>
          </Link>
          <h1 className="text-xl font-semibold text-primary mt-4">Create account</h1>
          <p className="text-muted text-sm mt-1">Start shopping in seconds</p>
        </div>

        <div className="card p-8">
          {displayError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-5">
              {displayError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => { setError(null); setForm({ ...form, name: e.target.value }); }}
                className="input"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => { setError(null); setForm({ ...form, email: e.target.value }); }}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => { setValidationError(''); setForm({ ...form, password: e.target.value }); }}
                className="input"
                placeholder="Min 6 characters"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => { setValidationError(''); setForm({ ...form, confirm: e.target.value }); }}
                className="input"
                placeholder="Repeat password"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
