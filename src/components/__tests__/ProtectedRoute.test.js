// src/components/__tests__/ProtectedRoute.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProtectedRoute from '../ProtectedRoute';
import { authService } from '../../services/authService';

jest.mock('../../services/authService');

const mockStore = configureStore([]);

describe('ProtectedRoute', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false
      }
    });
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    );
  };

  test('redirects to login when not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);

    renderWithRouter(
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        } />
      </Routes>
    );

    expect(window.location.pathname).toBe('/login');
  });

  test('renders protected content when authenticated', () => {
    // Update store to authenticated state
    store = mockStore({
      auth: {
        isAuthenticated: true,
        user: { id: '1', name: 'Test User' },
        loading: false
      }
    });

    authService.isAuthenticated.mockReturnValue(true);

    renderWithRouter(
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        } />
      </Routes>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('shows loading state when authenticating', () => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        loading: true
      }
    });

    renderWithRouter(
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        } />
      </Routes>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('preserves query parameters when redirecting', () => {
    authService.isAuthenticated.mockReturnValue(false);

    renderWithRouter(
      <Routes>
        <Route path="/protected" element={
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        } />
      </Routes>,
      { route: '/protected?returnUrl=/dashboard' }
    );

    expect(window.location.search).toBe('?returnUrl=/dashboard');
  });
});