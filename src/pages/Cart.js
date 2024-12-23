import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cart/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import CartSkeleton from './../components/common/cartSkeleton'
import EmptyCart from './../components/cart/EmptyCart'


const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);


  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
    toast.success('Cart updated');
  };

  if (isLoading) return <CartSkeleton />;
  if (items.length === 0) return <EmptyCart />;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link
          to="/shop"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Shopping Cart</h1>

      {/* Desktop and Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map(item => (
            <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
              {/* Mobile Layout */}
              <div className="flex flex-col md:hidden">
                <div className="flex items-start space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm">${item.price}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      className="w-8 h-8 flex items-center justify-center border rounded"
                    >
                        -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="w-8 h-8 flex items-center justify-center border rounded"
                    >
                        +
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-600 hover:text-red-800"
                    >
                        Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-6">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      className="w-8 h-8 flex items-center justify-center border rounded"
                    >
                        -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="w-8 h-8 flex items-center justify-center border rounded"
                    >
                        +
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="font-medium w-24 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-600 hover:text-red-800"
                  >
                      Remove
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          ))}
          </AnimatePresence>

        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-600 hover:text-red-800 text-sm md:text-base"
        >
          Clear Cart
          </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-2 mb-4 text-sm md:text-base">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
          </Link>
      </div>
    </div>
    </div >
  );
};


export default Cart;