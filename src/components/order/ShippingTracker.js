// src/components/order/ShippingTracker.js
const ShippingTracker = ({ status, trackingNumber }) => {
    const steps = [
      { id: 'processing', label: 'Processing' },
      { id: 'shipped', label: 'Shipped' },
      { id: 'in_transit', label: 'In Transit' },
      { id: 'delivered', label: 'Delivered' }
    ];
  
    const getCurrentStep = () => {
      return steps.findIndex(step => step.id === status);
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-medium mb-4">Shipping Status</h3>
        
        {trackingNumber && (
          <p className="text-sm text-gray-600 mb-4">
            Tracking Number: {trackingNumber}
          </p>
        )}
  
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-1/2 w-full h-0.5 bg-gray-200" />
          <div 
            className="absolute top-1/2 h-0.5 bg-blue-500 transition-all"
            style={{ width: `${(getCurrentStep() / (steps.length - 1)) * 100}%` }}
          />
  
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="flex flex-col items-center"
              >
                <div className={`w-4 h-4 rounded-full mb-2 ${
                  index <= getCurrentStep() ? 'bg-blue-500' : 'bg-gray-200'
                }`} />
                <span className="text-sm">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };