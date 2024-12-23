// src/components/checkout/PaymentForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const PaymentForm = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      icon: 'credit-card'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: 'bank'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 border rounded-lg flex items-center ${
                paymentMethod === method.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <span className="ml-3">{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Credit Card Form */}
      {paymentMethod === 'credit_card' && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              {...register('cardNumber', {
                required: 'Card number is required',
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: 'Invalid card number'
                }
              })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                {...register('expiryDate', {
                  required: 'Expiry date is required',
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: 'Invalid expiry date (MM/YY)'
                  }
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                {...register('cvv', {
                  required: 'CVV is required',
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: 'Invalid CVV'
                  }
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="123"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Pay Now
          </button>
        </form>
      )}

      {/* Bank Transfer Instructions */}
      {paymentMethod === 'bank_transfer' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Bank Transfer Instructions</h4>
          <ul className="space-y-2 text-sm">
            <li>Bank: Example Bank</li>
            <li>Account Number: 1234567890</li>
            <li>Account Name: Store Name</li>
            <li>Reference: ORDER-{Date.now()}</li>
          </ul>
          <button
            onClick={onSubmit}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            I have made the transfer
          </button>
        </div>
      )}
    </div>
  );
};