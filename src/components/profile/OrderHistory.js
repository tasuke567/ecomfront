// src/components/profile/OrderHistory.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Order History</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Order #{order.id}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: ${order.total}</p>
              </div>
              <Link
                to={`/orders/${order.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default OrderHistory;