import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cart/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty</p>
        <Link to="/shop" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div>
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        </div>
        <div className="space-x-4">
          <Link
            to="/shop"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Continue Shopping
          </Link>
          <Link
            to="/checkout"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;