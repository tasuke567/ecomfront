import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cart/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ตะกร้าสินค้า</h1>
      
      {cart.items.length === 0 ? (
        <p>ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div>
          {cart.items.map(item => (
            <div key={item.id} className="flex items-center border p-4 mb-2">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
              <div className="ml-4 flex-grow">
                <h3>{item.name}</h3>
                <p>฿{item.price}</p>
                <div className="flex items-center mt-2">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-1 border"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-1 border"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-4 text-red-500"
                  >
                    ลบ
                  </button>
                </div>
              </div>
              <div className="font-bold">
                ฿{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <div className="text-xl font-bold">
              รวมทั้งหมด: ฿{cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </div>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              ชำระเงิน
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;