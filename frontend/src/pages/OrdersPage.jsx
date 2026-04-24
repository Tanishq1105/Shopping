import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatPrice, formatDate } from '../utils/helpers';
import api from '../utils/api';

const STATUS_COLORS = {
  Pending:    'badge bg-yellow-100 text-yellow-700',
  Processing: 'badge bg-blue-100 text-blue-700',
  Shipped:    'badge bg-purple-100 text-purple-700',
  Delivered:  'badge bg-green-100 text-green-700',
  Cancelled:  'badge bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/orders')
      .then(({ data }) => setOrders(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
      {[1,2,3].map((i) => (
        <div key={i} className="card p-5 animate-pulse h-28 bg-slate-100" />
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <h1 className="text-2xl font-display text-primary mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-lg font-semibold text-primary mb-2">No orders yet</p>
          <p className="text-muted mb-6">You haven't placed any orders. Start shopping!</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs font-mono text-muted mb-1">#{order._id}</p>
                  <p className="text-sm text-muted">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={STATUS_COLORS[order.status] || 'badge bg-slate-100 text-slate-600'}>
                    {order.status}
                  </span>
                  <span className="font-bold text-primary">{formatPrice(order.totalPrice)}</span>
                </div>
              </div>

              {/* Items preview */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {order.orderItems.map((item, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                    <img src={item.image} alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                    />
                    <div>
                      <p className="text-xs font-medium line-clamp-1 max-w-[100px]">{item.name}</p>
                      <p className="text-xs text-muted">×{item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex gap-4 text-xs text-muted">
                  <span>{order.isPaid ? '✅ Paid' : '⏳ Payment Pending'}</span>
                  <span>{order.isDelivered ? '✅ Delivered' : '📦 Not Delivered'}</span>
                  <span>via {order.paymentMethod}</span>
                </div>
                <Link to={`/orders/${order._id}`} className="text-sm text-accent hover:underline font-medium">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
