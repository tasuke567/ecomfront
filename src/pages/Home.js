// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // ข้อมูลจำลองสำหรับสินค้าแนะนำ
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "/api/placeholder/300/300",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "/api/placeholder/300/300",
    },
    {
      id: 3,
      name: "Laptop Pro",
      price: 1299.99,
      image: "/api/placeholder/300/300",
    },
    {
      id: 4,
      name: "Smartphone",
      price: 899.99,
      image: "/api/placeholder/300/300",
    },
  ];

  // ข้อมูลจำลองสำหรับหมวดหมู่
  const categories = [
    {
      id: 1,
      name: "Electronicsasdf",
      image: "/api/placeholder/400/200",
      slug: "electronics",
    },
    {
      id: 2,
      name: "Fashion",
      image: "/api/placeholder/400/200",
      slug: "fashion",
    },
    {
      id: 3,
      name: "Home & Living",
      image: "/api/placeholder/400/200",
      slug: "home-living",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/800"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-center h-full max-w-xl">
            <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
              Find Your Perfect Style
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Shop the latest trends with exclusive deals and new arrivals daily.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/shop"
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                to="/categories"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
              <p className="text-gray-600 mt-2">Find what you're looking for</p>
            </div>
            <Link to="/categories" className="text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop/${category.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                    <p className="text-gray-200 text-sm">{category.itemCount} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">Handpicked by our experts</p>
            </div>
            <Link to="/shop" className="text-blue-600 hover:text-blue-700">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Promotions Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Promotion Card 1 */}
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src="/api/placeholder/600/300"
                alt="Special Offer"
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent p-8 flex flex-col justify-center">
                <span className="text-sm font-semibold text-yellow-400">Limited Time Offer</span>
                <h3 className="text-2xl font-bold mt-2">Summer Sale</h3>
                <p className="mt-2 mb-4">Up to 50% off on selected items</p>
                <Link
                  to="/shop/sale"
                  className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-medium w-fit hover:bg-gray-100"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Promotion Card 2 */}
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src="/api/placeholder/600/300"
                alt="New Arrivals"
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent p-8 flex flex-col justify-center">
                <span className="text-sm font-semibold text-yellow-400">Just Landed</span>
                <h3 className="text-2xl font-bold mt-2">New Collection</h3>
                <p className="mt-2 mb-4">Check out our latest arrivals</p>
                <Link
                  to="/shop/new"
                  className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-medium w-fit hover:bg-gray-100"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="mb-8">Get updates about new products and special offers</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-4 py-2 text-gray-900"
            />
            <button
              type="submit"
              className="bg-gray-900 px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;