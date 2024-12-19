// src/components/cards/ProductCard.js
const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Product Image */}
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.price}
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };