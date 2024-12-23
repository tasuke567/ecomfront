// src/components/checkout/OrderReview.js
const OrderReview = ({ order, shippingDetails, onConfirm }) => {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <span className="font-medium">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* Shipping Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Shipping Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Full Name</p>
              <p>{shippingDetails.firstName} {shippingDetails.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p>{shippingDetails.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Address</p>
              <p>{shippingDetails.address}</p>
              <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
            </div>
          </div>
        </div>
  
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
  
        <button
          onClick={onConfirm}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Confirm Order
        </button>
      </div>
    );
  };