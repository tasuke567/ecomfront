// src/services/__tests__/api.test.js
import axios from 'axios';
import { createAPIService, apiService } from '../api';
import { tokenService } from '../tokenService';

jest.mock('axios');
jest.mock('../tokenService');

describe('API Service', () => {
  let mockAxiosInstance;
  
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    
    // Mock axios create instance
    mockAxiosInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      },
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      defaults: {
        headers: {
          common: {}
        }
      }
    };
    
    axios.create.mockReturnValue(mockAxiosInstance);
    
    // Mock token service methods
    tokenService.get.mockImplementation(() => localStorage.getItem('token'));
    tokenService.remove.mockImplementation(() => localStorage.removeItem('token'));
  });

  describe('Instance Creation', () => {
    test('creates axios instance with correct config', () => {
      createAPIService();
      
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: expect.any(String),
        timeout: expect.any(Number),
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      });
    });

    test('adds request interceptor', () => {
      createAPIService();
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
    });

    test('adds response interceptor', () => {
      createAPIService();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('Request Interceptor', () => {
    test('adds auth header when token exists', () => {
      const testToken = 'test-token';
      localStorage.setItem('token', testToken);
      const api = createAPIService();
      
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const config = { headers: {} };
      const result = requestInterceptor(config);
      
      expect(result.headers['Authorization']).toBe(`Bearer ${testToken}`);
    });

    test('does not add auth header when token is missing', () => {
      const api = createAPIService();
      
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      const config = { headers: {} };
      const result = requestInterceptor(config);
      
      expect(result.headers['Authorization']).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    test('handles 401 error correctly', async () => {
      const api = createAPIService();
      const responseInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = {
        response: { status: 401 }
      };
      
      try {
        await responseInterceptor(error);
      } catch (e) {
        expect(tokenService.remove).toHaveBeenCalled();
        expect(window.location.href).toBe('/login');
      }
    });

    test('handles network error', async () => {
      const api = createAPIService();
      const responseInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = {};
      
      try {
        await responseInterceptor(error);
      } catch (e) {
        expect(e.response.data.message).toContain('Network error');
      }
    });

    test('handles timeout error', async () => {
      const api = createAPIService();
      const responseInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = { code: 'ECONNABORTED' };
      
      try {
        await responseInterceptor(error);
      } catch (e) {
        expect(e.response.data.message).toContain('timed out');
      }
    });
  });

  describe('API Methods', () => {
    const mockResponse = { data: { id: 1, name: 'Test' } };
    const testUrl = '/test';
    const testData = { name: 'Test' };

    beforeEach(() => {
      mockAxiosInstance.get.mockResolvedValue(mockResponse);
      mockAxiosInstance.post.mockResolvedValue(mockResponse);
      mockAxiosInstance.put.mockResolvedValue(mockResponse);
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);
    });

    test('get method calls axios get', async () => {
      const api = createAPIService();
      await apiService.get(testUrl);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(testUrl, {});
    });

    test('post method calls axios post', async () => {
      const api = createAPIService();
      await apiService.post(testUrl, testData);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(testUrl, testData, {});
    });

    test('put method calls axios put', async () => {
      const api = createAPIService();
      await apiService.put(testUrl, testData);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(testUrl, testData, {});
    });

    test('delete method calls axios delete', async () => {
      const api = createAPIService();
      await apiService.delete(testUrl);
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(testUrl, {});
    });
  });
});