// Cart is stored in-memory per user session using a simple User-embedded approach.
// For production you'd use a dedicated Cart model or Redis.
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// In-memory cart store (keyed by userId string)
// Replace with a Cart MongoDB model for persistence across sessions.
const carts = {};

const getCart = asyncHandler(async (req, res) => {
  const cart = carts[req.user._id] || [];
  res.json({ success: true, data: cart });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty = 1 } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.stock < qty) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  const userId = req.user._id.toString();
  if (!carts[userId]) carts[userId] = [];

  const existing = carts[userId].find((i) => i.productId === productId);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, product.stock);
  } else {
    carts[userId].push({
      productId,
      name:  product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      qty,
    });
  }

  res.json({ success: true, data: carts[userId] });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const { qty }  = req.body;
  const cart     = carts[userId] || [];
  const item     = cart.find((i) => i.productId === req.params.productId);

  if (!item) {
    res.status(404);
    throw new Error('Cart item not found');
  }

  if (qty <= 0) {
    carts[userId] = cart.filter((i) => i.productId !== req.params.productId);
  } else {
    item.qty = Math.min(qty, item.stock);
  }

  res.json({ success: true, data: carts[userId] });
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userId    = req.user._id.toString();
  carts[userId]   = (carts[userId] || []).filter((i) => i.productId !== req.params.productId);
  res.json({ success: true, data: carts[userId] });
});

const clearCart = asyncHandler(async (req, res) => {
  carts[req.user._id.toString()] = [];
  res.json({ success: true, data: [] });
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
