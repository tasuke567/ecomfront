// src/pages/Shop.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product || { products: [] });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    // จำลองข้อมูลสินค้า
    const dummyProducts = [
      {
        id: 1,
        name: "Smartphone X",
        price: 999.99,
        description: "Latest smartphone with amazing features",
        image: "/api/placeholder/400/320"
      },
      {
        id: 2,
        name: "Laptop Pro",
        price: 1499.99,
        description: "Powerful laptop for professionals",
        image: "/api/placeholder/400/320"
      },
      {
        id: 3,
        name: "Wireless Headphones",
        price: 199.99,
        description: "High-quality wireless headphones",
        image: "/api/placeholder/400/320"
      }
    ];

    setFilteredProducts(dummyProducts);
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;