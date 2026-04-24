const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name:      { type: String,  required: true },
  qty:       { type: Number,  required: true },
  image:     { type: String,  required: true },
  price:     { type: Number,  required: true },
  product:   { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      street:  { type: String, required: true },
      city:    { type: String, required: true },
      state:   { type: String, required: true },
      zip:     { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Card',
    },
    paymentResult: {
      id:         { type: String },
      status:     { type: String },
      updateTime: { type: String },
      email:      { type: String },
    },
    itemsPrice:    { type: Number, required: true, default: 0 },
    taxPrice:      { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice:    { type: Number, required: true, default: 0 },
    isPaid:        { type: Boolean, required: true, default: false },
    paidAt:        { type: Date },
    isDelivered:   { type: Boolean, required: true, default: false },
    deliveredAt:   { type: Date },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
