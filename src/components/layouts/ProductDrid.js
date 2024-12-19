// src/components/layouts/ProductGrid.js
const ProductGrid = ({ products }) => {
    return (
      <div className="container mx-auto px-4">
        {/* Filters and Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Filters</h3>
              {/* Filter content */}
            </div>
          </div>
  
          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
  
        {/* Responsive Pagination */}
        <div className="mt-8 flex justify-center sm:justify-end">
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };