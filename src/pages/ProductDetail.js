// src/pages/ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);

  // สมมติข้อมูลสินค้า (ในอนาคตจะดึงจาก API)
  const product = {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation",
    images: ["/api/placeholder/600/400"],
    specs: {
      brand: "AudioTech",
      color: "Black",
      warranty: "1 Year"
    }
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
        <div className="space-y-4">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600">${product.price}</p>
          
          <div className="prose prose-sm text-gray-600">
            <p>{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border-r"
              >-</button>
              <span className="px-4">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border-l"
              >+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>

          {/* Specifications */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
            <dl className="grid grid-cols-1 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex">
                  <dt className="w-1/3 text-gray-600">{key}:</dt>
                  <dd className="w-2/3 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;