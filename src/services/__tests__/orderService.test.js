// src/services/__tests__/orderService.test.js
import { orderService } from '../orderService';
import axios from 'axios';

jest.mock('axios');

describe('orderService', () => {
  const mockToken = 'test-token';
  const mockOrder = {
    id: 1,
    items: [{ id: 1, quantity: 2 }],
    total: 200
  };

  beforeEach(() => {
    localStorage.setItem('token', mockToken);
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    test('creates order successfully', async () => {
      const mockResponse = { data: mockOrder };
      axios.post.mockResolvedValueOnce(mockResponse);

      const result = await orderService.createOrder(mockOrder);

      expect(axios.post).toHaveBeenCalledWith('/api/orders', mockOrder, {
        headers: { Authorization: `Bearer ${mockToken}` }
      });
      expect(result).toEqual(mockOrder);
    });

    test('throws error when order creation fails', async () => {
      axios.post.mockRejectedValueOnce(new Error('Failed to create order'));

      await expect(orderService.createOrder(mockOrder)).rejects.toThrow();
    });
  });

  describe('getOrders', () => {
    test('fetches orders successfully', async () => {
      const mockOrders = [mockOrder];
      axios.get.mockResolvedValueOnce({ data: mockOrders });

      const result = await orderService.getOrders();

      expect(axios.get).toHaveBeenCalledWith('/api/orders', {
        headers: { Authorization: `Bearer ${mockToken}` }
      });
      expect(result).toEqual(mockOrders);
    });
  });
});