// src/utils/__tests__/errorHandler.test.js
import { ApiError, errorHandler } from '../errorHandler';
import { store } from '../../store';
import { logout } from '../../redux/auth/authSlice';

jest.mock('../../store');
jest.mock('../../redux/auth/authSlice');

describe('Error Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ApiError', () => {
    test('creates ApiError with correct properties', () => {
      const error = new ApiError('Test error', 400, { field: 'test' });
      
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('ApiError');
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(400);
      expect(error.data).toEqual({ field: 'test' });
    });
  });

  describe('handleError', () => {
    test('handles 400 Bad Request', () => {
      const error = new ApiError('Bad request', 400);
      const message = errorHandler.handleError(error);
      expect(message).toBe('Invalid request. Please check your input.');
    });

    test('handles 401 Unauthorized and triggers logout', () => {
      const error = new ApiError('Unauthorized', 401);
      const message = errorHandler.handleError(error);
      
      expect(message).toBe('Session expired. Please login again.');
      expect(store.dispatch).toHaveBeenCalledWith(logout());
    });

    test('handles 403 Forbidden', () => {
      const error = new ApiError('Forbidden', 403);
      const message = errorHandler.handleError(error);
      expect(message).toBe('You do not have permission to perform this action.');
    });

    test('handles 404 Not Found', () => {
      const error = new ApiError('Not found', 404);
      const message = errorHandler.handleError(error);
      expect(message).toBe('Requested resource not found.');
    });

    test('handles 500 Server Error', () => {
      const error = new ApiError('Server error', 500);
      const message = errorHandler.handleError(error);
      expect(message).toBe('Server error. Please try again later.');
    });

    test('returns custom message for unknown status codes', () => {
      const customMessage = 'Custom error message';
      const error = new ApiError(customMessage, 418);
      const message = errorHandler.handleError(error);
      expect(message).toBe(customMessage);
    });

    test('handles non-ApiError errors', () => {
      const error = new Error('Regular error');
      const message = errorHandler.handleError(error);
      expect(message).toBe('An unexpected error occurred.');
    });
  });

  describe('handleApiCall', () => {
    test('returns successful API call result', async () => {
      const expectedResult = { data: 'test' };
      const apiFunction = jest.fn().mockResolvedValue(expectedResult);

      const result = await errorHandler.handleApiCall(apiFunction);
      expect(result).toBe(expectedResult);
    });

    test('handles API error and throws ApiError', async () => {
      const apiError = new Error('API Error');
      apiError.response = { status: 500 };
      const apiFunction = jest.fn().mockRejectedValue(apiError);

      await expect(errorHandler.handleApiCall(apiFunction))
        .rejects
        .toThrow(ApiError);
    });

    test('preserves status code in thrown ApiError', async () => {
      const status = 404;
      const apiError = new Error('Not Found');
      apiError.response = { status };
      const apiFunction = jest.fn().mockRejectedValue(apiError);

      try {
        await errorHandler.handleApiCall(apiFunction);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.status).toBe(status);
      }
    });
  });
});