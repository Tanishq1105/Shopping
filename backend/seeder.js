const mongoose = require('mongoose');
const dotenv   = require('dotenv');
const User     = require('./models/User');
const Product  = require('./models/Product');

dotenv.config();

const products = [
  { name: 'Apple iPhone 15 Pro', description: 'Latest iPhone with titanium design, A17 Pro chip, and pro camera system.', price: 79999, originalPrice: 89999, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500', category: 'Electronics', brand: 'Apple', stock: 25, rating: 4.8, numReviews: 120, featured: true },
  { name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise canceling headphones with 30hr battery life.', price: 24999, originalPrice: 29999, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500', category: 'Electronics', brand: 'Sony', stock: 40, rating: 4.7, numReviews: 89, featured: true },
  { name: 'Samsung 4K OLED TV 55"', description: 'Stunning OLED display with Quantum HDR and built-in Alexa.', price: 89999, originalPrice: 109999, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=500', category: 'Electronics', brand: 'Samsung', stock: 15, rating: 4.6, numReviews: 54 },
  { name: 'Nike Air Max 270', description: 'Iconic Air Max cushioning with a bold, modern silhouette for all-day comfort.', price: 8999, originalPrice: 10999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', category: 'Fashion', brand: 'Nike', stock: 60, rating: 4.5, numReviews: 200, featured: true },
  { name: 'Levi\'s 511 Slim Fit Jeans', description: 'Classic slim fit jeans in stretch denim for a comfortable everyday wear.', price: 3499, originalPrice: 4499, image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500', category: 'Fashion', brand: 'Levi\'s', stock: 80, rating: 4.3, numReviews: 145 },
  { name: 'Instant Pot Duo 7-in-1', description: 'Multi-use pressure cooker — pressure cook, slow cook, rice cooker, steamer, sauté, and warmer.', price: 5999, originalPrice: 7999, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500', category: 'Home & Kitchen', brand: 'Instant Pot', stock: 35, rating: 4.8, numReviews: 320, featured: true },
  { name: 'Dyson V15 Detect Vacuum', description: 'Laser detects invisible dust. Automatically optimizes suction power.', price: 42999, originalPrice: 49999, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', category: 'Home & Kitchen', brand: 'Dyson', stock: 20, rating: 4.7, numReviews: 67 },
  { name: 'Yoga Mat Pro 6mm', description: 'Non-slip, eco-friendly TPE yoga mat with alignment lines and carrying strap.', price: 1499, originalPrice: 1999, image: 'https://images.unsplash.com/photo-1601925228008-d08afe5e6d55?w=500', category: 'Sports', brand: 'BodyFit', stock: 100, rating: 4.4, numReviews: 88 },
  { name: 'Atomic Habits — James Clear', description: 'The #1 New York Times bestseller on building good habits and breaking bad ones.', price: 499, originalPrice: 699, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', category: 'Books', brand: 'Penguin', stock: 200, rating: 4.9, numReviews: 512, featured: true },
  { name: 'The Lean Startup', description: 'How today\'s entrepreneurs use continuous innovation to create successful businesses.', price: 399, originalPrice: 599, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500', category: 'Books', brand: 'Crown', stock: 150, rating: 4.6, numReviews: 290 },
  { name: 'Maybelline Fit Me Foundation', description: 'Matte + poreless finish foundation. Blurs pores. 40 shades.', price: 549, originalPrice: 699, image: 'https://images.unsplash.com/photo-1631214524020-3c3da8989c8b?w=500', category: 'Beauty', brand: 'Maybelline', stock: 75, rating: 4.2, numReviews: 178 },
  { name: 'LEGO Star Wars Millennium Falcon', description: '7,541 pieces. One of the most detailed LEGO sets ever created for fans of all ages.', price: 54999, originalPrice: 62999, image: 'https://images.unsplash.com/photo-1518331368925-fd8d678778a4?w=500', category: 'Toys', brand: 'LEGO', stock: 10, rating: 4.9, numReviews: 43, featured: true },
];

const users = [
  { name: 'Admin User', email: 'admin@shopverse.com', password: 'admin123', isAdmin: true },
  { name: 'John Doe',   email: 'john@example.com',   password: 'user123' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    await User.deleteMany();
    await Product.deleteMany();
    console.log('🗑  Cleared existing data');

    await User.create(users);
    await Product.create(products);
    console.log(`✅ Seeded ${users.length} users and ${products.length} products`);
    console.log('\n👤 Admin: admin@shopverse.com / admin123');
    console.log('👤 User:  john@example.com / user123\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
