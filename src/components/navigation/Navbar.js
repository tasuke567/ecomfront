// src/components/navigation/Navbar.js
const Navbar = () => {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-blue-600">
                Logo
              </a>
            </div>
  
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/shop" className="text-gray-600 hover:text-blue-600">Shop</a>
              <a href="/categories" className="text-gray-600 hover:text-blue-600">Categories</a>
              <a href="/cart" className="text-gray-600 hover:text-blue-600">Cart</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </button>
            </div>
  
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/shop" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded">
              Shop
            </a>
            <a href="/categories" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded">
              Categories
            </a>
            <a href="/cart" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded">
              Cart
            </a>
            <a href="/login" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded">
              Login
            </a>
          </div>
        </div>
      </nav>
    );
  };