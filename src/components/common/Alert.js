// src/components/common/Alert.js
import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  const types = {
    success: 'bg-green-100 text-green-800 border-green-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <div className={`${types[type]} border px-4 py-3 rounded relative mb-4`}>
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <span 
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={onClose}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      )}
    </div>
  );
};