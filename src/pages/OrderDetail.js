// src/pages/OrderDetail.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PaymentStatusTracker from '../components/order/PaymentStatusTracker';
import ShippingTracker from '../components/order/ShippingTracker';
import CancelOrder from '../components/order/CancelOrder';
import { emailService } from '../services/emailService';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch order details
    fetchOrderDetails();
  }, [orderId]);

  const handleCancelOrder = async (orderId, reason) => {
    // API call to cancel order
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order #{orderId}</h1>
      
      <div className="space-y-6">
        <PaymentStatusTracker status={order.paymentStatus} />
        <ShippingTracker 
          status={order.shippingStatus}
          trackingNumber={order.trackingNumber}
        />
        
        {order.status !== 'cancelled' && (
          <CancelOrder 
            orderId={orderId}
            onCancel={handleCancelOrder}
          />
        )}
      </div>
    </div>
  );
};