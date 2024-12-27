import { configureStore } from '@reduxjs/toolkit';
import authReducer, { 
  authStart,
  authSuccess, 
  authFailure,
  setUser,
  setLoading,
  setError,
  logout,
  updateProfile
} from '../authSlice';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock authService for updateProfile
jest.mock('../../../services/authService', () => ({
  authService: {
    updateProfile: jest.fn()
  }
}));

describe('Auth Slice', () => {
  let store;

  beforeEach(() => {
    // Clear localStorage and reset store before each test
    localStorageMock.clear();
    store = configureStore({
      reducer: { auth: authReducer }
    });
  });

  test('initial state is correct', () => {
    const state = store.getState().auth;
    expect(state).toEqual({
      user: null,
      isAuthenticated: false,
      loading: false,
      token: localStorage.getItem('token'),
      error: null
    });
  });

  test('authStart sets loading to true', () => {
    store.dispatch(authStart());
    const state = store.getState().auth;
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('authSuccess updates user and authentication state', () => {
    const mockUser = { 
      id: '1', 
      email: 'test@example.com', 
      name: 'Test User' 
    };
    
    store.dispatch(authSuccess(mockUser));
    const state = store.getState().auth;
    
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('authFailure sets error state', () => {
    const errorMessage = 'Invalid credentials';
    
    store.dispatch(authFailure(errorMessage));
    const state = store.getState().auth;
    
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
  });

  test('logout resets auth state and removes token from localStorage', () => {
    // First, set up an authenticated state and token
    const mockUser = { 
      id: '1', 
      email: 'test@example.com', 
      name: 'Test User' 
    };
    
    localStorage.setItem('token', 'test-token');
    
    store.dispatch(authSuccess(mockUser));
    store.dispatch(logout());
    
    const state = store.getState().auth;
    
    expect(state).toEqual({
      user: null,
      isAuthenticated: false,
      loading: false,
      token: null,
      error: null
    });
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('setUser updates user information', () => {
    const userData = { 
      id: '1', 
      email: 'test@example.com', 
      name: 'Test User' 
    };
    
    store.dispatch(setUser(userData));
    const state = store.getState().auth;
    
    expect(state.user).toEqual(userData);
    expect(state.error).toBeNull();
  });

  test('setLoading updates loading state', () => {
    store.dispatch(setLoading(true));
    const state = store.getState().auth;
    
    expect(state.loading).toBe(true);
  });

  test('setError updates error state', () => {
    const errorMessage = 'Test error';
    
    store.dispatch(setError(errorMessage));
    const state = store.getState().auth;
    
    expect(state.error).toBe(errorMessage);
    expect(state.loading).toBe(false);
  });

  describe('updateProfile', () => {
    const { authService } = require('../../../services/authService');

    test('handles successful profile update', async () => {
      const initialUser = { 
        id: '1', 
        name: 'Original Name' 
      };
      const updatedUserData = { 
        name: 'Updated Name' 
      };
      const mockResponse = { 
        name: 'Updated Name',
        id: '1'
      };

      // Mock successful service call
      authService.updateProfile.mockResolvedValue({ data: mockResponse });

      // Dispatch initial user
      store.dispatch(authSuccess(initialUser));

      // Dispatch update profile thunk
      const result = await store.dispatch(updateProfile(updatedUserData));
      
      const state = store.getState().auth;
      
      expect(result.type).toBe('auth/updateProfile/fulfilled');
      expect(state.user).toEqual(mockResponse);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('handles profile update failure', async () => {
      const errorMessage = 'Update failed';

      // Mock failed service call
      authService.updateProfile.mockRejectedValue({ 
        response: { data: { message: errorMessage } } 
      });

      const result = await store.dispatch(updateProfile({}));
      
      const state = store.getState().auth;
      
      expect(result.type).toBe('auth/updateProfile/rejected');
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});