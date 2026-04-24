const express = require('express');
const router  = express.Router();
const {
  getProducts, getProductById, createProduct, updateProduct,
  deleteProduct, createReview, getCategories,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/categories', getCategories);
router.route('/').get(getProducts).post(protect, adminOnly, createProduct);
router.route('/:id')
  .get(getProductById)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);
router.post('/:id/reviews', protect, createReview);

module.exports = router;
