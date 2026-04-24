const express = require('express');
const router  = express.Router();
const { createOrder, getMyOrders, getOrderById, markOrderPaid, getAllOrders } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/').get(getMyOrders).post(createOrder);
router.get('/all', adminOnly, getAllOrders);
router.route('/:id').get(getOrderById);
router.put('/:id/pay', markOrderPaid);

module.exports = router;
