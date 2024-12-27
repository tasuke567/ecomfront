import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { logout } from '../../../redux/auth/authSlice';
import cartReducer from '../../../redux/cart/cartSlice';
import Navbar from '../Navbar';

// Mock Modules
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock Redux dispatch
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

// Test Utilities
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        loading: false,
        error: null,
        ...initialState.auth
      },
      cart: {
        items: [],
        total: 0,
        ...initialState.cart
      }
    }
  });
};

const renderWithProviders = (
  component,
  { initialState = {}, store = createMockStore(initialState) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>
    ),
    store,
  };
};

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Rendering', () => {
    test('renders basic elements when not authenticated', () => {
      renderWithProviders(<Navbar />);
      
      // Logo and brand
      expect(screen.getByText('E-Shop')).toBeInTheDocument();
      
      // Navigation links
      expect(screen.getByText('Shop')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      
      // Cart icon should be present
      expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
    });

    test('renders user-specific elements when authenticated', () => {
      const user = { email: 'test@example.com', picture: '/test.jpg' };
      renderWithProviders(<Navbar />, {
        initialState: { auth: { user } }
      });

      // User-specific elements
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByAltText('')).toHaveAttribute('src', user.picture);
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
      
      // Login link should not be present
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });
  });

  describe('Cart Functionality', () => {
    test('displays no cart count when empty', () => {
      renderWithProviders(<Navbar />);
      expect(screen.queryByTestId('cart-count')).not.toBeInTheDocument();
    });

    test('displays correct cart items count', () => {
      renderWithProviders(<Navbar />, {
        initialState: {
          cart: { items: [{ id: 1 }, { id: 2 }] }
        }
      });
      expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    });

    test('cart link navigates to cart page', () => {
      renderWithProviders(<Navbar />);
      const cartLink = screen.getByRole('link', { name: /cart/i });
      expect(cartLink).toHaveAttribute('href', '/cart');
    });
  });

  describe('Mobile Menu', () => {
    test('mobile menu is hidden by default', () => {
      renderWithProviders(<Navbar />);
      expect(screen.getByTestId('mobile-menu')).not.toBeVisible();
    });

    test('toggles mobile menu visibility on button click', async () => {
      renderWithProviders(<Navbar />);
      
      const menuButton = screen.getByLabelText('Toggle menu');
      const mobileMenu = screen.getByTestId('mobile-menu');
      
      // Initial state
      expect(mobileMenu).not.toBeVisible();
      
      // Open menu
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(mobileMenu).toBeVisible();
      });
      
      // Close menu
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(mobileMenu).not.toBeVisible();
      });
    });

    test('closes mobile menu when clicking a link', async () => {
      renderWithProviders(<Navbar />);
      
      // Open menu
      fireEvent.click(screen.getByLabelText('Toggle menu'));
      
      // Click a link
      fireEvent.click(screen.getByText('Shop'));
      
      // Menu should close
      await waitFor(() => {
        expect(screen.getByTestId('mobile-menu')).not.toBeVisible();
      });
    });
  });

  describe('Authentication Actions', () => {
    test('logout button dispatches logout action and redirects', async () => {
      renderWithProviders(<Navbar />, {
        initialState: {
          auth: { user: { email: 'test@example.com' } }
        }
      });

      const logoutButton = screen.getByRole('button', { name: /logout/i });
      
      fireEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(logout());
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
      });
    });

    test('profile link is present when authenticated', () => {
      renderWithProviders(<Navbar />, {
        initialState: {
          auth: { user: { email: 'test@example.com' } }
        }
      });

      const profileLink = screen.getByRole('link', { name: /test@example.com/i });
      expect(profileLink).toHaveAttribute('href', '/profile');
    });
  });
});