// src/components/checkout/StepsIndicator.js
const StepsIndicator = ({ currentStep }) => {
    const steps = [
      { id: 1, name: 'Shipping' },
      { id: 2, name: 'Payment' },
      { id: 3, name: 'Review' }
    ];
  
    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                ${currentStep >= step.id 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : 'border-gray-300 text-gray-300'}`}
              >
                {step.id}
              </div>
              
              {/* Step Name */}
              <span className={`ml-2 text-sm ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
  
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`w-20 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default StepsIndicator;