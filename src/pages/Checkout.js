// src/pages/Checkout.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { number: 1, title: 'Shipping' },
    { number: 2, title: 'Payment' },
    { number: 3, title: 'Review' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((s, i) => (
            <React.Fragment key={s.number}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  {s.number}
                </div>
                <span className="mt-2 text-sm">{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-4"/>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Checkout Forms */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              className="w-full px-4 py-2 border rounded"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="State"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      )}

      {/* Add similar sections for Payment (step 2) and Review (step 3) */}
    </div>
  );
};

export default Checkout;