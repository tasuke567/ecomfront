// src/services/emailService.js
import axios from 'axios';

export const emailService = {
  async sendOrderConfirmation(order) {
    try {
      const response = await axios.post('/api/email/order-confirmation', {
        orderId: order.id,
        email: order.email,
        orderDetails: {
          items: order.items,
          total: order.total,
          shippingAddress: order.shippingAddress
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send confirmation email');
    }
  },

  async sendShippingUpdate(order) {
    try {
      const response = await axios.post('/api/email/shipping-update', {
        orderId: order.id,
        email: order.email,
        trackingNumber: order.trackingNumber,
        status: order.shippingStatus
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send shipping update');
    }
  }
};