// src/utils/__tests__/api.test.js
import axios from 'axios';
import { API, authAPI, productAPI, orderAPI } from '../api';

jest.mock('axios');

describe('API Service', () => {
  const mockAxiosInstance = {
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    get: jest.fn(),
    post: jest.fn()
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    axios.create.mockReturnValue(mockAxiosInstance);
  });

  describe('Request Interceptor', () => {
    test('adds auth token to headers when token exists', () => {
      const token = 'test-token';
      localStorage.setItem('token', token);
      
      const mockReq = { headers: {} };
      const interceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const result = interceptor(mockReq);

      expect(result.headers.Authorization).toBe(`Bearer ${token}`);
    });

    test('does not add auth token when token is missing', () => {
      const mockReq = { headers: {} };
      const interceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const result = interceptor(mockReq);

      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe('Auth API', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    test('login makes correct API call', async () => {
      mockAxiosInstance.post.mockResolvedValueOnce({ data: { token: 'test-token' } });
      await authAPI.login(mockCredentials);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/login',
        mockCredentials
      );
    });

    test('register makes correct API call', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      mockAxiosInstance.post.mockResolvedValueOnce({ data: { user: userData } });
      await authAPI.register(userData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/register',
        userData
      );
    });

    test('getProfile makes correct API call', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: { user: {} } });
      await authAPI.getProfile();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/auth/profile');
    });
  });

  describe('Product API', () => {
    test('getAllProducts makes correct API call', async () => {
      const params = { page: 1, limit: 10 };
      mockAxiosInstance.get.mockResolvedValueOnce({ data: [] });
      
      await productAPI.getAllProducts(params);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/products', { params });
    });

    test('getProduct makes correct API call', async () => {
      const productId = '123';
      mockAxiosInstance.get.mockResolvedValueOnce({ data: {} });
      
      await productAPI.getProduct(productId);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/products/${productId}`);
    });

    test('searchProducts makes correct API call', async () => {
      const query = 'test product';
      mockAxiosInstance.get.mockResolvedValueOnce({ data: [] });
      
      await productAPI.searchProducts(query);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/products/search?q=${query}`);
    });
  });

  describe('Order API', () => {
    test('createOrder makes correct API call', async () => {
      const orderData = {
        items: [{ id: 1, quantity: 2 }],
        total: 100
      };
      mockAxiosInstance.post.mockResolvedValueOnce({ data: {} });
      
      await orderAPI.createOrder(orderData);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/orders', orderData);
    });

    test('getOrders makes correct API call', async () => {
      mockAxiosInstance.get.mockResolvedValueOnce({ data: [] });
      
      await orderAPI.getOrders();
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/orders');
    });

    test('getOrder makes correct API call', async () => {
      const orderId = '123';
      mockAxiosInstance.get.mockResolvedValueOnce({ data: {} });
      
      await orderAPI.getOrder(orderId);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/orders/${orderId}`);
    });
  });
});