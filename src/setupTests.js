import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// Increase timeout for async tests
jest.setTimeout(10000);

// Mock images
global.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload && this.onload();
    });
  }
};

// Mock intersection observer
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Additional configuration for React Testing Library
configure({ 
  asyncUtilTimeout: 5000,
});

// Create a custom render that includes Redux Provider
export const createTestStore = (preloadedState = {}, reducers = {}) => {
  return configureStore({
    reducer: reducers,
    preloadedState
  });
};

export const renderWithProviders = (
  ui, 
  { 
    preloadedState = {}, 
    store = createTestStore({}, {}),
    ...renderOptions 
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
};

// Mock react-router if needed
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// After each test
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});