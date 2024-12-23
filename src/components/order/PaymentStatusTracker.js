// src/components/order/PaymentStatusTracker.js
const PaymentStatusTracker = ({ status }) => {
    const statusTypes = {
      pending: {
        color: 'yellow',
        text: 'Pending Payment',
        description: 'Waiting for payment confirmation'
      },
      processing: {
        color: 'blue',
        text: 'Processing',
        description: 'Payment is being processed'
      },
      completed: {
        color: 'green',
        text: 'Completed',
        description: 'Payment has been confirmed'
      },
      failed: {
        color: 'red',
        text: 'Failed',
        description: 'Payment was unsuccessful'
      }
    };
  
    const currentStatus = statusTypes[status];
  
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full bg-${currentStatus.color}-500`} />
          <div>
            <h3 className="font-medium">{currentStatus.text}</h3>
            <p className="text-sm text-gray-500">{currentStatus.description}</p>
          </div>
        </div>
      </div>
    );
  };