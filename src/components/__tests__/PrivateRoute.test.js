// src/components/__tests__/PrivateRoute.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from '../PrivateRoute';

// Mock components
const LoginPage = () => <div>Login Page</div>;
const ProtectedPage = () => <div>Protected Content</div>;

// Create a mock store
const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: (state = initialState, action) => state
    }
  });
};

const renderWithProviders = (component, { initialState, route = '/' } = {}) => {
  const store = createMockStore(initialState);
  window.history.pushState({}, '', route);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<ProtectedPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('PrivateRoute Component', () => {
  test('redirects to login when user is not authenticated', () => {
    const initialState = { auth: { user: null } };
    renderWithProviders(<PrivateRoute />, { initialState });
    
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('renders protected content when user is authenticated', () => {
    const initialState = {
      auth: { user: { id: 1, name: 'Test User' } }
    };
    renderWithProviders(<PrivateRoute />, { initialState });
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  test('preserves the redirect path when redirecting to login', () => {
    const initialState = { auth: { user: null } };
    const route = '/protected/resource';
    renderWithProviders(<PrivateRoute />, { initialState, route });
    
    expect(window.location.pathname).toBe('/login');
    expect(window.location.state).toEqual({ from: route });
  });

  test('handles nested routes correctly', () => {
    const initialState = {
      auth: { user: { id: 1, name: 'Test User' } }
    };
    
    render(
      <Provider store={createMockStore(initialState)}>
        <MemoryRouter initialEntries={['/nested']}>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="nested" element={<div>Nested Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });

  test('redirects to login with correct state when accessing multiple nested routes', () => {
    const initialState = { auth: { user: null } };
    const nestedRoute = '/protected/deeply/nested/route';
    
    renderWithProviders(<PrivateRoute />, { 
      initialState, 
      route: nestedRoute 
    });
    
    expect(window.location.pathname).toBe('/login');
    expect(window.location.state).toEqual({ from: nestedRoute });
  });

  test('maintains query parameters when redirecting to login', () => {
    const initialState = { auth: { user: null } };
    const route = '/protected?returnUrl=/dashboard';
    
    renderWithProviders(<PrivateRoute />, { initialState, route });
    
    expect(window.location.pathname).toBe('/login');
    expect(window.location.search).toBe('?returnUrl=/dashboard');
  });

  test('handles state changes in auth status', () => {
    const { rerender } = renderWithProviders(<PrivateRoute />, {
      initialState: { auth: { user: null } }
    });
    
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    
    // Update store state to simulate login
    rerender(
      <Provider store={createMockStore({ auth: { user: { id: 1 } } })}>
        <MemoryRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<ProtectedPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});