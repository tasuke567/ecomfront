// src/components/auth/__tests__/LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginForm from '../LoginForm';
import { login } from '../../../redux/actions/userActions';

const mockStore = configureStore([thunk]);
jest.mock('../../../redux/actions/userActions');

describe('LoginForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null
      }
    });
    jest.clearAllMocks();
  });

  const renderLoginForm = () => {
    return render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  };

  test('renders login form with all fields', () => {
    renderLoginForm();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderLoginForm();
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.click(submitButton);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test('validates email format', async () => {
    renderLoginForm();
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const mockLoginAction = jest.fn();
    login.mockImplementation(mockLoginAction);
    
    renderLoginForm();

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123!');

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLoginAction).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!'
      });
    });
  });

  test('shows error message from redux state', () => {
    store = mockStore({
      auth: {
        loading: false,
        error: 'Invalid credentials'
      }
    });

    renderLoginForm();
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  test('disables form submission while loading', () => {
    store = mockStore({
      auth: {
        loading: true,
        error: null
      }
    });

    renderLoginForm();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  test('handles password visibility toggle', async () => {
    renderLoginForm();
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /toggle password/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('shows validation errors on blur', async () => {
    renderLoginForm();
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, 'test');
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();

    await userEvent.type(passwordInput, '123');
    fireEvent.blur(passwordInput);
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test('clears validation errors on valid input', async () => {
    renderLoginForm();
    
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid');
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.blur(emailInput);
    expect(screen.queryByText(/invalid email format/i)).not.toBeInTheDocument();
  });

  test('prevents multiple form submissions while loading', async () => {
    const mockLoginAction = jest.fn();
    login.mockImplementation(mockLoginAction);
    
    store = mockStore({
      auth: {
        loading: false,
        error: null
      }
    });

    renderLoginForm();

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'Password123!');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // Simulate multiple rapid clicks
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(mockLoginAction).toHaveBeenCalledTimes(1);
  });
});