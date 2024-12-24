// src/pages/Shop.js
import React, { useEffect, useState, useMemo  } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import SearchBar from '../components/search/SearchBar';


const Shop = () => {
  const dispatch = useDispatch();

  // Move products definition to the top
  const products = useMemo(() => [
    {
      id: 1,
      name: "Smartphone X",
      price: 999.99,
      category: "Electronics",
      description: "Latest smartphone with amazing features",
      image: "/api/placeholder/400/320"
    },
    {
      id: 2,
      name: "Laptop Pro",
      price: 1499.99,
      category: "Electronics",
      description: "Powerful laptop for professionals",
      image: "/api/placeholder/400/320"
    },
    {
      id: 3,
      name: "Wireless Headphones",
      price: 199.99,
      category: "Electronics",
      description: "High-quality wireless headphones",
      image: "/api/placeholder/400/320"
    }
  ], []);

  // State declarations
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sort: 'newest'
  });

  // Set page metadata
  useEffect(() => {
    document.title = "Shop | Your Store Name";
    const metaDesc = document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Browse our collection of products with great deals and fast shipping";
    document.head.appendChild(metaDesc);

    return () => {
      document.head.removeChild(metaDesc);
    };
  }, []); // Remove products dependency as it's not needed here

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(product =>
        product.price >= min && (max ? product.price <= max : true)
      );
    }

    // Sort
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      default: // newest
        result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
  }, [searchTerm, filters, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <select
            className="px-4 py-2 border rounded-lg"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>

          {/* Price Range Filter */}
          <select
            className="px-4 py-2 border rounded-lg"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          >
            <option value="all">All Prices</option>
            <option value="0-100">Under $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000">Over $1000</option>
          </select>

          {/* Sort */}
          <select
            className="px-4 py-2 border rounded-lg"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>


      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {filteredProducts.length} products found
          {searchTerm && ` for "${searchTerm}"`}
        </p>

        {/* Sort Options */}
        <select
          className="border rounded-lg px-3 py-1.5"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <button
                  onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Shop;