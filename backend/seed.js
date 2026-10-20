const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@shopbyweb.com",
      password: hashedPassword,
      role: "admin",
    });

    const products = [
      {
        name: "Wireless Noise-Cancelling Headphones",
        description:
          "Immersive sound experience with advanced active noise cancellation.",
        price: 299.99,
        category: "Electronics",
        stock: 15,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.8,
        numReviews: 24,
      },
      {
        name: "Minimalist Modern Chair",
        description:
          "A stylish and comfortable addition to any contemporary living room.",
        price: 150.0,
        category: "Furniture",
        stock: 30,
        imageUrl:
          "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.2,
        numReviews: 12,
      },
      {
        name: "Luxury Leather Sofa",
        description:
          "Premium three-seater leather sofa designed for maximum comfort and elegance.",
        price: 799.99,
        category: "Furniture",
        stock: 15,
        imageUrl:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.8,
        numReviews: 45,
      },
      {
        name: "Wooden Coffee Table",
        description:
          "Modern solid wood coffee table perfect for your living room or office.",
        price: 129.99,
        category: "Furniture",
        stock: 25,
        imageUrl:
          "https://images.unsplash.com/photo-1493666438817-866a91353ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.5,
        numReviews: 28,
      },
      {
        name: "Scandinavian Bookshelf",
        description:
          "Minimalist five-tier bookshelf crafted from engineered wood with a natural finish.",
        price: 249.99,
        category: "Furniture",
        stock: 20,
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.6,
        numReviews: 31,
      },
      {
        name: "Ergonomic Office Desk",
        description:
          "Spacious wooden office desk with a sturdy steel frame for home and office use.",
        price: 299.99,
        category: "Furniture",
        stock: 18,
        imageUrl:
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.7,
        numReviews: 39,
      },
      {
        name: "Professional DSLR Camera",
        description:
          "Capture stunning moments with high-resolution clarity and speed.",
        price: 1199.99,
        category: "Electronics",
        stock: 8,
        imageUrl:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.9,
        numReviews: 50,
      },
      {
        name: "Classic White Sneakers",
        description:
          "Versatile and comfortable, a staple for any casual outfit.",
        price: 85.0,
        category: "Clothing",
        stock: 50,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.5,
        numReviews: 89,
      },
      {
        name: "Smart LED TV 55 Inch",
        description:
          "Ultra HD 4K Smart LED TV with vibrant colors, streaming apps, and built-in Wi-Fi.",
        price: 549.99,
        category: "Electronics",
        stock: 12,
        imageUrl:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.7,
        numReviews: 36,
      },
      {
        name: "Wireless Bluetooth Speaker",
        description:
          "Portable Bluetooth speaker with powerful bass, clear sound, and long battery life.",
        price: 79.99,
        category: "Electronics",
        stock: 25,
        imageUrl:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.6,
        numReviews: 52,
      },
      {
        name: "Mechanical Gaming Keyboard",
        description:
          "RGB mechanical gaming keyboard with tactile switches and customizable lighting.",
        price: 99.99,
        category: "Electronics",
        stock: 18,
        imageUrl:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.8,
        numReviews: 67,
      },
      {
        name: "Wireless Gaming Mouse",
        description:
          "High-precision wireless gaming mouse with adjustable DPI and ergonomic design.",
        price: 59.99,
        category: "Electronics",
        stock: 30,
        imageUrl:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.5,
        numReviews: 43,
      },
      {
        name: "Smart Watch Pro",
        description:
          "Modern smartwatch with fitness tracking, heart-rate monitoring, and notifications.",
        price: 149.99,
        category: "Electronics",
        stock: 20,
        imageUrl:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.4,
        numReviews: 58,
      },
      {
        name: "Modern Fabric Armchair",
        description:
          "Comfortable modern armchair with soft fabric upholstery and elegant wooden legs.",
        price: 219.99,
        category: "Furniture",
        stock: 14,
        imageUrl:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.6,
        numReviews: 21,
      },
      {
        name: "Modern Dining Table",
        description:
          "Elegant wooden dining table designed for modern homes and family dining.",
        price: 399.99,
        category: "Furniture",
        stock: 10,
        imageUrl:
          "https://images.unsplash.com/photo-1617806118233-18e1de247200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.7,
        numReviews: 19,
      },
      {
        name: "Comfortable Office Chair",
        description:
          "Ergonomic office chair with lumbar support, adjustable height, and comfortable cushioning.",
        price: 179.99,
        category: "Furniture",
        stock: 22,
        imageUrl:
          "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.5,
        numReviews: 34,
      },
      {
        name: "Modern Floor Lamp",
        description:
          "Minimalist floor lamp with a contemporary design perfect for living rooms and bedrooms.",
        price: 89.99,
        category: "Furniture",
        stock: 27,
        imageUrl:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.3,
        numReviews: 17,
      },
      {
        name: "King Size Bed Frame",
        description:
          "Sturdy and stylish king size bed frame designed for comfort and durability.",
        price: 649.99,
        category: "Furniture",
        stock: 7,
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.8,
        numReviews: 29,
      },
      {
        name: "Men Casual Denim Jacket",
        description:
          "Classic denim jacket with a comfortable fit suitable for casual everyday wear.",
        price: 69.99,
        category: "Clothing",
        stock: 40,
        imageUrl:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.4,
        numReviews: 46,
      },
      {
        name: "Women Summer Dress",
        description:
          "Elegant lightweight summer dress with a stylish design for casual occasions.",
        price: 59.99,
        category: "Clothing",
        stock: 35,
        imageUrl:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.6,
        numReviews: 63,
      },
      {
        name: "Premium Cotton Hoodie",
        description:
          "Soft premium cotton hoodie with a relaxed fit and comfortable fleece interior.",
        price: 49.99,
        category: "Clothing",
        stock: 45,
        imageUrl:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.7,
        numReviews: 72,
      },
      {
        name: "Classic Leather Backpack",
        description:
          "Durable leather backpack with multiple compartments for work, travel, and daily use.",
        price: 119.99,
        category: "Accessories",
        stock: 24,
        imageUrl:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.5,
        numReviews: 38,
      },
      {
        name: "Premium Leather Wallet",
        description:
          "Slim genuine leather wallet with multiple card slots and a compact design.",
        price: 39.99,
        category: "Accessories",
        stock: 50,
        imageUrl:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.6,
        numReviews: 41,
      },
      {
        name: "Polarized Sunglasses",
        description:
          "Stylish polarized sunglasses offering UV protection and a comfortable lightweight frame.",
        price: 44.99,
        category: "Accessories",
        stock: 32,
        imageUrl:
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.4,
        numReviews: 27,
      },
      {
        name: "Running Sports Shoes",
        description:
          "Lightweight running shoes with breathable material and responsive cushioning.",
        price: 109.99,
        category: "Footwear",
        stock: 28,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.8,
        numReviews: 95,
      },
      {
        name: "Classic Leather Boots",
        description:
          "Durable leather boots with a timeless design suitable for casual and formal outfits.",
        price: 139.99,
        category: "Footwear",
        stock: 16,
        imageUrl:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.5,
        numReviews: 32,
      },
      {
        name: "Stainless Steel Water Bottle",
        description:
          "Insulated stainless steel water bottle that keeps drinks cold or hot for hours.",
        price: 29.99,
        category: "Lifestyle",
        stock: 60,
        imageUrl:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.7,
        numReviews: 84,
      },
      {
        name: "Premium Coffee Maker",
        description:
          "Automatic coffee maker designed to prepare rich and flavorful coffee at home.",
        price: 199.99,
        category: "Home Appliances",
        stock: 13,
        imageUrl:
          "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 4.6,
        numReviews: 49,
      },
    ];

    await Product.insertMany(products);

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
