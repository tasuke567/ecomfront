// src/components/products/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // ป้องกันการ navigate เมื่อกดปุ่ม Add to Cart
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;