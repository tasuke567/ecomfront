// src/redux/__tests__/productSlice.test.js
import productReducer, {
    setProducts,
    setLoading,
    setError,
    initialState
  } from '../product/productSlice';
  
  describe('Product Slice', () => {
    test('should return initial state', () => {
      expect(productReducer(undefined, { type: undefined })).toEqual(initialState);
    });
  
    describe('Product Actions', () => {
      test('should handle setProducts', () => {
        const products = [
          { id: 1, name: 'Product 1', price: 100 },
          { id: 2, name: 'Product 2', price: 200 }
        ];
        
        const newState = productReducer(initialState, setProducts(products));
        
        expect(newState.products).toEqual(products);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBeNull();
      });
  
      test('should handle setLoading', () => {
        const newState = productReducer(initialState, setLoading(true));
        expect(newState.loading).toBe(true);
        
        const subsequentState = productReducer(newState, setLoading(false));
        expect(subsequentState.loading).toBe(false);
      });
  
      test('should handle setError', () => {
        const error = 'Failed to fetch products';
        const newState = productReducer(initialState, setError(error));
        
        expect(newState.error).toBe(error);
        expect(newState.loading).toBe(false);
      });
  
      test('should clear error when setting new products', () => {
        const errorState = productReducer(initialState, setError('Some error'));
        const products = [{ id: 1, name: 'Product 1' }];
        
        const newState = productReducer(errorState, setProducts(products));
        
        expect(newState.error).toBeNull();
        expect(newState.products).toEqual(products);
      });
  
      test('should clear error when setting loading', () => {
        const errorState = productReducer(initialState, setError('Some error'));
        const newState = productReducer(errorState, setLoading(true));
        
        expect(newState.error).toBeNull();
        expect(newState.loading).toBe(true);
      });
    });
  
    describe('State Mutations', () => {
      test('should not mutate state when setting products', () => {
        const products = [{ id: 1, name: 'Product 1' }];
        const state = { ...initialState };
        
        const newState = productReducer(state, setProducts(products));
        
        expect(newState).not.toBe(state);
        expect(newState.products).not.toBe(state.products);
      });
  
      test('should not mutate original products array', () => {
        const originalProducts = [{ id: 1, name: 'Product 1' }];
        const state = { ...initialState, products: originalProducts };
        
        const newProducts = [{ id: 2, name: 'Product 2' }];
        const newState = productReducer(state, setProducts(newProducts));
        
        expect(originalProducts).toEqual([{ id: 1, name: 'Product 1' }]);
        expect(newState.products).toEqual(newProducts);
      });
    });
  });