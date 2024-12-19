import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-lg p-4">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-medium">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;