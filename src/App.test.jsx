import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/auth/authSlice'
import App from './App'

// Mock GoogleOAuthProvider
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
}));

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
  preloadedState: {
    auth: {
      user: null,
      loading: false,
      error: null
    },
    cart: {
      items: []
    }
  }
});

describe('App Component', () => {
  test('renders app without crashing', () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
    expect(document.body).toBeInTheDocument();
  });
});