// src/services/__tests__/tokenService.test.js
import { tokenService } from '../tokenService';

describe('TokenService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Core token operations', () => {
    test('should set token in localStorage', () => {
      const testToken = 'test-token-123';
      tokenService.set(testToken);
      expect(localStorage.getItem('token')).toBe(testToken);
    });

    test('should not set token if value is empty', () => {
      tokenService.set('');
      tokenService.set(null);
      tokenService.set(undefined);
      expect(localStorage.getItem('token')).toBeNull();
    });

    test('should get token from localStorage', () => {
      const testToken = 'test-token-123';
      localStorage.setItem('token', testToken);
      const retrievedToken = tokenService.get();
      expect(retrievedToken).toBe(testToken);
    });

    test('should remove token from localStorage', () => {
      const testToken = 'test-token-123';
      localStorage.setItem('token', testToken);
      tokenService.remove();
      expect(localStorage.getItem('token')).toBeNull();
    });

    test('should check if token exists', () => {
      expect(tokenService.has()).toBe(false);
      localStorage.setItem('token', 'existing-token');
      expect(tokenService.has()).toBe(true);
    });
  });

  describe('Refresh token operations', () => {
    test('should set refresh token', () => {
      const refreshToken = 'refresh-token-123';
      tokenService.setRefreshToken(refreshToken);
      expect(localStorage.getItem('refreshToken')).toBe(refreshToken);
    });

    test('should get refresh token', () => {
      const refreshToken = 'refresh-token-123';
      localStorage.setItem('refreshToken', refreshToken);
      expect(tokenService.getRefreshToken()).toBe(refreshToken);
    });

    test('should remove both tokens when clearing', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('refreshToken', 'refresh-token');
      tokenService.clear();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });
  });
});