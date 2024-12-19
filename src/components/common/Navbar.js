// src/components/common/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice'; // Make sure to create this action


const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart || { items: [] });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-base font-medium text-gray-800">
              E-Shop
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Shop
            </Link>

            {/* Cart */}
            <Link to="/cart"
              className="grid inline-flex items-center text-gray-600 hover:text-gray-800 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5" // ลดขนาดลงเป็น h-3 w-3 (12px)
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.0" // ลด stroke ให้บางลงเพื่อให้เหมาะกับขนาดที่เล็กลง
              >
                <path d="M9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18C8.1 18 9 18.9 9 20Z" />
                <path d="M20 20C20 21.1 19.1 22 18 22C16.9 22 16 21.1 16 20C16 18.9 16.9 18 18 18C19.1 18 20 18.9 20 20Z" />
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17" />
              </svg>

              {/* ปรับ badge ให้เล็กลงตาม */}
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 w2.5 h2.5 text-[7px] flex items-center justify-center bg-gray-800 text-white rounded-full">
                  {cart.items.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {auth?.user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                  <img
                    src={auth.user.avatar || '/avatar-placeholder.png'}
                    className="h-5 w-5 rounded-full object-cover"
                    alt=""
                  />
                  <span className="text-sm">{auth.user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm px-3 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login"
                className="text-sm px-3 py-1 text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;