// src/components/checkout/OrderConfirmation.js
const OrderConfirmation = ({ orderNumber }) => {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
        <p className="text-gray-600 mb-6">
          Your order number is: #{orderNumber}
        </p>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-medium mb-4">What happens next?</h3>
          <ol className="space-y-4 text-left">
            <li className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">1</span>
              <span>Order confirmation email sent to your inbox</span>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">2</span>
              <span>We'll prepare your items for shipping</span>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">3</span>
              <span>Shipping confirmation email with tracking details</span>
            </li>
          </ol>
        </div>
  
        <div className="flex space-x-4 justify-center">
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
          >
            View Order
          </Link>
        </div>
      </div>
    );
  };