export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const getDiscount = (original, current) => {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};

export const truncate = (str, n = 80) =>
  str?.length > n ? str.slice(0, n) + '…' : str;

export const getErrorMsg = (err) =>
  err?.response?.data?.message || err?.message || 'Something went wrong';
