// src/services/__tests__/cartService.test.js
import { cartService } from '../cartService';

describe('cartService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveCart', () => {
    test('saves cart items to localStorage', () => {
      const mockItems = [{ id: 1, quantity: 2 }];
      cartService.saveCart(mockItems);
      
      expect(JSON.parse(localStorage.getItem('cartItems'))).toEqual(mockItems);
    });
  });

  describe('getCart', () => {
    test('retrieves cart items from localStorage', () => {
      const mockItems = [{ id: 1, quantity: 2 }];
      localStorage.setItem('cartItems', JSON.stringify(mockItems));

      const result = cartService.getCart();
      expect(result).toEqual(mockItems);
    });

    test('returns empty array when no items in localStorage', () => {
      const result = cartService.getCart();
      expect(result).toEqual([]);
    });
  });
});