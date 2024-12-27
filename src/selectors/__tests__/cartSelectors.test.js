// src/selectors/__tests__/cartSelectors.test.js
import {
    selectCart,
    selectCartItems,
    selectCartTotal,
    selectCartItemCount
  } from '../cartSelectors';
  
  describe('Cart Selectors', () => {
    const mockState = {
      cart: {
        items: [
          { id: 1, name: 'Product 1', price: 100, quantity: 2 },
          { id: 2, name: 'Product 2', price: 200, quantity: 1 }
        ],
        loading: false,
        error: null
      }
    };
  
    describe('Basic Selectors', () => {
      test('selectCart should return cart state', () => {
        expect(selectCart(mockState)).toEqual(mockState.cart);
      });
  
      test('selectCartItems should return cart items', () => {
        expect(selectCartItems(mockState)).toEqual(mockState.cart.items);
      });
    });
  
    describe('Calculated Selectors', () => {
      test('selectCartTotal should calculate total correctly', () => {
        // (100 * 2) + (200 * 1) = 400
        expect(selectCartTotal(mockState)).toBe(400);
      });
  
      test('selectCartItemCount should count total items', () => {
        // 2 + 1 = 3 items
        expect(selectCartItemCount(mockState)).toBe(3);
      });
  
      test('selectCartTotal should return 0 for empty cart', () => {
        const emptyState = {
          cart: {
            items: [],
            loading: false,
            error: null
          }
        };
        expect(selectCartTotal(emptyState)).toBe(0);
      });
  
      test('selectCartItemCount should return 0 for empty cart', () => {
        const emptyState = {
          cart: {
            items: [],
            loading: false,
            error: null
          }
        };
        expect(selectCartItemCount(emptyState)).toBe(0);
      });
    });
  
    describe('Edge Cases', () => {
      test('should handle items with decimal prices', () => {
        const stateWithDecimals = {
          cart: {
            items: [
              { id: 1, price: 10.99, quantity: 2 },
              { id: 2, price: 9.99, quantity: 1 }
            ]
          }
        };
        // (10.99 * 2) + (9.99 * 1) = 31.97
        expect(selectCartTotal(stateWithDecimals)).toBeCloseTo(31.97, 2);
      });
  
      test('should handle items with zero price', () => {
        const stateWithZeroPrice = {
          cart: {
            items: [
              { id: 1, price: 0, quantity: 2 },
              { id: 2, price: 100, quantity: 1 }
            ]
          }
        };
        expect(selectCartTotal(stateWithZeroPrice)).toBe(100);
      });
  
      test('should handle large quantities and prices', () => {
        const stateWithLargeNumbers = {
          cart: {
            items: [
              { id: 1, price: 999999.99, quantity: 999 },
              { id: 2, price: 1000000, quantity: 1 }
            ]
          }
        };
        expect(selectCartTotal(stateWithLargeNumbers)).toBeGreaterThan(0);
        expect(Number.isFinite(selectCartTotal(stateWithLargeNumbers))).toBe(true);
      });
    });
  
    describe('Selector Memoization', () => {
      test('should return same reference for same state', () => {
        const result1 = selectCartItems(mockState);
        const result2 = selectCartItems(mockState);
        expect(result1).toBe(result2);
      });
  
      test('should return new reference for different state', () => {
        const result1 = selectCartItems(mockState);
        const newState = {
          cart: {
            ...mockState.cart,
            items: [...mockState.cart.items]
          }
        };
        const result2 = selectCartItems(newState);
        expect(result1).not.toBe(result2);
      });
    });
  
    describe('Performance', () => {
      test('should handle large number of items efficiently', () => {
        const largeState = {
          cart: {
            items: Array.from({ length: 1000 }, (_, index) => ({
              id: index,
              price: 100,
              quantity: 1
            }))
          }
        };
        
        const startTime = performance.now();
        selectCartTotal(largeState);
        const endTime = performance.now();
        
        expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
      });
    });
  });