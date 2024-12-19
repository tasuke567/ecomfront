// src/pages/Product.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600">
            ${product.price}
          </p>

          <div className="border-t border-b py-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="text-sm">
            <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            Add to Cart
          </button>

          {/* Additional Information */}
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold">Product Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-600">SKU</div>
              <div>{product.sku}</div>
              <div className="text-gray-600">Category</div>
              <div>{product.category}</div>
              <div className="text-gray-600">Tags</div>
              <div>{product.tags?.join(', ')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;