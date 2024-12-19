// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Our E-Shop
              {user && `, ${user.name}`}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover amazing products at great prices
            </p>
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Electronics</h3>
            <p className="text-gray-600 mb-4">Latest gadgets and devices</p>
            <Link to="/shop?category=electronics" className="text-blue-600 hover:text-blue-800">
              Browse Electronics →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Fashion</h3>
            <p className="text-gray-600 mb-4">Trending clothing and accessories</p>
            <Link to="/shop?category=fashion" className="text-blue-600 hover:text-blue-800">
              Browse Fashion →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Home & Living</h3>
            <p className="text-gray-600 mb-4">Furniture and home decor</p>
            <Link to="/shop?category=home" className="text-blue-600 hover:text-blue-800">
              Browse Home & Living →
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Add ProductCard components here */}
          {/* This will be populated once we have product data */}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start Shopping Today</h2>
            <p className="mb-8">Join our community of happy customers</p>
            {!user ? (
              <div className="space-x-4">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
              </div>
            ) : (
              <Link
                to="/shop"
                className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Continue Shopping
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;