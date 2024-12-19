// src/components/common/Loading.js
import React from 'react';

export const Spinner = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export const SkeletonCard = () => (
  <div className="border rounded-lg p-4 w-full animate-pulse">
    <div className="h-48 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export const LoadingButton = ({ children }) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center" disabled>
    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
    {children}
  </button>
);