// src/components/order/CancelOrder.js
import React, { useState } from 'react';

const CancelOrder = ({ orderId, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const cancelReasons = [
    'Changed my mind',
    'Found better price elsewhere',
    'Ordered by mistake',
    'Shipping time too long',
    'Other'
  ];

  const handleCancel = async () => {
    try {
      setLoading(true);
      await onCancel(orderId, reason);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to cancel order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-red-600 hover:text-red-800"
      >
        Cancel Order
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium mb-4">Cancel Order</h3>
            
            <p className="text-gray-600 mb-4">
              Please select a reason for cancellation:
            </p>

            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-4"
            >
              <option value="">Select a reason</option>
              {cancelReasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancel}
                disabled={!reason || loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};