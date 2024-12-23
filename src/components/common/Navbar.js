import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart || { items: [] });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate('/login');
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-medium text-gray-800">E-Shop</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-sm text-gray-600 hover:text-gray-800">
              Shop
            </Link>
            {/* Cart */}
            <Link to="/cart" className="relative inline-flex items-center text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0">
                <path d="M9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18C8.1 18 9 18.9 9 20Z" />
                <path d="M20 20C20 21.1 19.1 22 18 22C16.9 22 16 21.1 16 20C16 18.9 16.9 18 18 18C19.1 18 20 18.9 20 20Z" />
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17" />
              </svg>
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 text-xs flex items-center justify-center bg-gray-800 text-white rounded-full">
                  {cart.items.length}
                </span>
              )}
            </Link>
            {/* Desktop User Menu */}
            {auth?.user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800">
                  <img src={user.picture || '/default-avatar.png'} className="h-6 w-6 rounded-full object-cover" alt="" />
                  <span>{auth.user.email}</span>
                </Link>
                <button onClick={handleLogout} className="text-sm px-3 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm px-3 py-1 text-gray-700 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <div className="flex flex-col space-y-4">
            <Link
              to="/shop"
              className="text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>

            <Link
              to="/cart"
              className="flex items-center justify-between text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cart</span>
              {cart.items.length > 0 && (
                <span className="bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                  {cart.items.length}
                </span>
              )}
            </Link>
            {auth?.user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img src={auth.user.avatar || '/avatar-placeholder.png'} className="h-6 w-6 rounded-full object-cover" alt="" />
                  <span>{auth.user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
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