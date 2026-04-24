import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [pages,    setPages]    = useState(1);
  const [total,    setTotal]    = useState(0);

  const fetchProducts = useCallback(async (query = {}) => {
    setLoading(true); setError(null);
    try {
      const merged = { ...params, ...query };
      const { data } = await api.get('/products', { params: merged });
      setProducts(data.data);
      setPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load products');
    } finally { setLoading(false); }
  }, [JSON.stringify(params)]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return { products, loading, error, pages, total, fetchProducts };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Product not found');
      } finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  return { product, loading, error };
}
