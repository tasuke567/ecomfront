// src/pages/ProductDetail.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // สมมติข้อมูลสินค้า (ในอนาคตจะดึงจาก API)
  const product = {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation",
    images: ["/api/placeholder/600/400"],
    features: [
      "Bluetooth 5.0",
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium sound quality"
    ]
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl font-bold text-blue-600">${product.price}</p>

          <div className="prose prose-sm text-gray-500">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Features</h3>
            <ul className="list-disc list-inside space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-500">{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                aria-label="Decrease quantity"
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                aria-label="Increase quantity"
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;