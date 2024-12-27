// src/components/cart/__tests__/CartItem.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../../redux/cart/cartSlice';
import CartItem from '../CartItem';

const mockProduct = {
  id: 1,
  name: "Test Product",
  price: 100,
  quantity: 1,
  image: "test.jpg"
};

const renderWithProviders = (ui, {
  preloadedState = {},
  store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState
  }),
  ...renderOptions
} = {}) => {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>, renderOptions),
  };
};

describe('CartItem Component', () => {
  test('renders cart item correctly', () => {
    renderWithProviders(<CartItem item={mockProduct} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`฿${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toHaveValue(mockProduct.quantity);
  });

  test('handles quantity update', () => {
    renderWithProviders(<CartItem item={mockProduct} />);
    
    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '2' } });
    
    expect(quantityInput).toHaveValue(2);
  });

  test('handles item removal', () => {
    const { store } = renderWithProviders(<CartItem item={mockProduct} />);
    
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    
    const state = store.getState();
    expect(state.cart.items).not.toContainEqual(mockProduct);
  });
});

// src/components/auth/__tests__/LoginForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { authService } from '../../../services/authService';

jest.mock('../../../services/authService');

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits form with correct values', async () => {
    authService.login.mockResolvedValueOnce({ user: { email: 'test@example.com' } });
    
    render(<LoginForm onSuccess={jest.fn()} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('shows error message on login failure', async () => {
    const errorMessage = 'Invalid credentials';
    authService.login.mockRejectedValueOnce(new Error(errorMessage));
    
    render(<LoginForm onSuccess={jest.fn()} />);
    
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});

// src/services/__tests__/authService.test.js
import { authService } from '../authService';
import axios from 'axios';

jest.mock('axios');

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    test('successful login', async () => {
      const mockResponse = {
        data: {
          token: 'fake-token',
          user: { id: 1, email: mockCredentials.email }
        }
      };
      
      axios.post.mockResolvedValueOnce(mockResponse);
      
      const result = await authService.login(mockCredentials);
      
      expect(result).toEqual(mockResponse.data);
      expect(localStorage.getItem('token')).toBe(mockResponse.data.token);
    });

    test('login failure', async () => {
      const errorMessage = 'Invalid credentials';
      axios.post.mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(authService.login(mockCredentials))
        .rejects
        .toThrow(errorMessage);
    });
  });
});