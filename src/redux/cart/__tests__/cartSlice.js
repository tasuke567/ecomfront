import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../cartSlice';

describe('Cart Slice', () => {
  let store;
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 10.00,
    quantity: 1
  };

  beforeEach(() => {
    store = configureStore({
      reducer: { cart: cartReducer }
    });
  });

  test('initial state is correct', () => {
    const state = store.getState().cart;
    expect(state).toEqual({
      items: [],
      total: 0
    });
  });

  test('addToCart adds a new product', () => {
    store.dispatch(addToCart(mockProduct));
    const state = store.getState().cart;
    
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockProduct);
    expect(state.total).toBe(10.00);
  });

  test('addToCart increases quantity if product already exists', () => {
    // Add product first time
    store.dispatch(addToCart(mockProduct));
    
    // Add same product again
    store.dispatch(addToCart(mockProduct));
    
    const state = store.getState().cart;
    
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.total).toBe(20.00);
  });

  test('removeFromCart removes a product completely', () => {
    store.dispatch(addToCart(mockProduct));
    store.dispatch(removeFromCart(mockProduct.id));
    
    const state = store.getState().cart;
    
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });

  test('removeFromCart decreases quantity when multiple items', () => {
    // Add two of the same product
    store.dispatch(addToCart(mockProduct));
    store.dispatch(addToCart(mockProduct));
    
    // Remove one
    store.dispatch(removeFromCart(mockProduct.id));
    
    const state = store.getState().cart;
    
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.total).toBe(10.00);
  });

  test('updateQuantity changes product quantity', () => {
    store.dispatch(addToCart(mockProduct));
    store.dispatch(updateQuantity({ 
      id: mockProduct.id, 
      quantity: 3 
    }));
    
    const state = store.getState().cart;
    
    expect(state.items[0].quantity).toBe(3);
    expect(state.total).toBe(30.00);
  });

  test('clearCart removes all items', () => {
    // Add multiple products
    const product1 = { ...mockProduct, id: '1' };
    const product2 = { ...mockProduct, id: '2', price: 15 };
    
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));
    
    store.dispatch(clearCart());
    
    const state = store.getState().cart;
    
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });

  test('handles multiple product types', () => {
    const product1 = { id: '1', name: 'Product 1', price: 10, quantity: 1 };
    const product2 = { id: '2', name: 'Product 2', price: 15, quantity: 2 };
    
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));
    
    const state = store.getState().cart;
    
    expect(state.items).toHaveLength(2);
    expect(state.total).toBe(10 + 30); // 10 + (15 * 2)
  });

  test('removeFromCart handles single item removal', () => {
    const product = { id: '1', name: 'Product', price: 10, quantity: 1 };
    
    store.dispatch(addToCart(product));
    store.dispatch(removeFromCart(product.id));
    
    const state = store.getState().cart;
    
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });
});