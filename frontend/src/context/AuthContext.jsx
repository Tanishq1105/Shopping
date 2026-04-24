import { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import { getErrorMsg } from '../utils/helpers';

const AuthContext = createContext(null);

const STORAGE_KEY = 'shopverse_user';

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'));
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  const saveUser = (data) => {
    setUser(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const login = useCallback(async (email, password) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      saveUser(data.data);
      return true;
    } catch (err) {
      setError(getErrorMsg(err));
      return false;
    } finally { setLoading(false); }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      saveUser(data.data);
      return true;
    } catch (err) {
      setError(getErrorMsg(err));
      return false;
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    setLoading(true); setError(null);
    try {
      const { data } = await api.put('/auth/profile', updates);
      saveUser(data.data);
      return true;
    } catch (err) {
      setError(getErrorMsg(err));
      return false;
    } finally { setLoading(false); }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
