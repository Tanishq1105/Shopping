# 🛒 ShopVerse — Full-Stack Shopping App

A production-ready e-commerce application built with React, Node.js, Express, MongoDB, and Tailwind CSS.

---

## 📁 Project Structure

```
shopping-app/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Login, register, profile
│   │   ├── productController.js   # CRUD for products
│   │   ├── orderController.js     # Order management
│   │   └── cartController.js      # Cart operations
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT protection
│   │   └── errorMiddleware.js     # Global error handler
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Product.js             # Product schema
│   │   └── Order.js               # Order schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── cartRoutes.js
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── server.js                  # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/            # Button, Input, Badge, Modal
│   │   │   ├── layout/            # Navbar, Footer, Sidebar
│   │   │   ├── product/           # ProductCard, ProductGrid, Filter
│   │   │   ├── cart/              # CartItem, CartDrawer, CartSummary
│   │   │   └── auth/              # LoginForm, RegisterForm
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Auth state management
│   │   │   └── CartContext.jsx    # Cart state management
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   └── useProducts.js
│   │   ├── utils/
│   │   │   ├── api.js             # Axios instance + interceptors
│   │   │   └── helpers.js         # Formatting utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

| Tool | Version | Download |
|------|---------|---------|
| Node.js | >= 18.x | https://nodejs.org |
| npm | >= 9.x | Comes with Node |
| MongoDB | >= 6.x | https://mongodb.com or use Atlas |
| Git | Any | https://git-scm.com |

---

## 🚀 Installation & Setup

### 1. Clone or extract the project

```bash
cd shopping-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopverse
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=30d
```

> 💡 For MongoDB Atlas (cloud), replace MONGO_URI with your connection string.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the App

### Development Mode (both servers)

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Seed Sample Data (optional)

```bash
cd backend
npm run seed
```

This creates 12 sample products and an admin user:
- **Admin:** admin@shopverse.com / admin123
- **User:** john@example.com / user123

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | ❌ |
| POST | /api/auth/login | Login user | ❌ |
| GET | /api/auth/profile | Get user profile | ✅ |
| PUT | /api/auth/profile | Update profile | ✅ |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/products | Get all products (+ filter/search/paginate) | ❌ |
| GET | /api/products/:id | Get single product | ❌ |
| POST | /api/products | Create product | Admin |
| PUT | /api/products/:id | Update product | Admin |
| DELETE | /api/products/:id | Delete product | Admin |

### Cart
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/cart | Get user's cart | ✅ |
| POST | /api/cart | Add item to cart | ✅ |
| PUT | /api/cart/:itemId | Update cart item qty | ✅ |
| DELETE | /api/cart/:itemId | Remove item from cart | ✅ |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/orders | Get user's orders | ✅ |
| POST | /api/orders | Create order | ✅ |
| GET | /api/orders/:id | Get order by ID | ✅ |
| PUT | /api/orders/:id/pay | Mark as paid | ✅ |

---

## 🧪 Testing API (with curl)

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Get products
curl http://localhost:5000/api/products

# Get products with filters
curl "http://localhost:5000/api/products?keyword=shoes&category=fashion&minPrice=10&maxPrice=200&page=1"
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Tailwind CSS v3 |
| State | React Context API |
| HTTP | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (JSON Web Tokens) |
| Dev Tools | Nodemon, ESLint |

---

## 📦 Build for Production

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd ../backend
NODE_ENV=production npm start
```

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes (middleware)
- Admin-only routes
- Input validation
- CORS configured

---

## 📝 Environment Variables Reference

### Backend `.env`
```env
NODE_ENV=development         # development | production
PORT=5000                    # Server port
MONGO_URI=...                # MongoDB connection string
JWT_SECRET=...               # Secret for signing JWTs
JWT_EXPIRE=30d               # Token expiry duration
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api   # Backend API base URL
```
