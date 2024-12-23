// src/components/checkout/Invoice.js
const Invoice = ({ order }) => {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8">
        {/* Header */}
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold">Invoice</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500">Invoice Number</p>
              <p className="font-medium">{order.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
  
        {/* Items */}
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-center py-2">Quantity</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">${item.price}</td>
                <td className="text-right py-2">${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${order.subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </div>
  
        {/* Print Button */}
        <button
          onClick={() => window.print()}
          className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 print:hidden"
        >
          Print Invoice
        </button>
      </div>
    );
  };