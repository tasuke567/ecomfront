// src/components/auth/__tests__/ForgotPassword.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword';
import { authService } from '../../../services/authService';

// Mocks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('../../../services/authService', () => ({
  requestPasswordReset: jest.fn(),
  resetPassword: jest.fn()
}));

describe('ForgotPassword Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  describe('Request Reset Step', () => {
    test('renders email request form initially', () => {
      render(<ForgotPassword />);
      
      expect(screen.getByText(/reset password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send reset instructions/i })).toBeInTheDocument();
    });

    test('handles successful reset request', async () => {
      render(<ForgotPassword />);
      
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole('button', { name: /send reset instructions/i });

      await userEvent.type(emailInput, 'test@example.com');
      
      authService.requestPasswordReset.mockResolvedValueOnce({});
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(authService.requestPasswordReset).toHaveBeenCalledWith('test@example.com');
        expect(toast.success).toHaveBeenCalledWith('Reset instructions sent to your email');
        expect(screen.getByText(/create new password/i)).toBeInTheDocument();
      });
    });

    test('handles reset request error', async () => {
      render(<ForgotPassword />);
      
      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole('button', { name: /send reset instructions/i });

      await userEvent.type(emailInput, 'wrong@email.com');
      
      authService.requestPasswordReset.mockRejectedValueOnce(new Error('Email not found'));
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Email not found');
        expect(screen.queryByText(/create new password/i)).not.toBeInTheDocument();
      });
    });

    test('validates email before submission', async () => {
      render(<ForgotPassword />);
      
      const submitButton = screen.getByRole('button', { name: /send reset instructions/i });
      
      fireEvent.click(submitButton);

      expect(authService.requestPasswordReset).not.toHaveBeenCalled();
    });
  });

  describe('Reset Password Step', () => {
    beforeEach(() => {
      render(<ForgotPassword />);
      const emailInput = screen.getByLabelText(/email address/i);
      userEvent.type(emailInput, 'test@example.com');
      authService.requestPasswordReset.mockResolvedValueOnce({});
      fireEvent.click(screen.getByRole('button', { name: /send reset instructions/i }));
    });

    test('renders reset password form after successful request', async () => {
      await waitFor(() => {
        expect(screen.getByText(/create new password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/reset code/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
      });
    });

    test('handles successful password reset', async () => {
      await waitFor(() => screen.getByLabelText(/reset code/i));

      const tokenInput = screen.getByLabelText(/reset code/i);
      const passwordInput = screen.getByLabelText(/new password/i);
      const submitButton = screen.getByRole('button', { name: /reset password/i });

      await userEvent.type(tokenInput, '123456');
      await userEvent.type(passwordInput, 'newPassword123');
      
      authService.resetPassword.mockResolvedValueOnce({});
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(authService.resetPassword).toHaveBeenCalledWith('123456', 'newPassword123');
        expect(toast.success).toHaveBeenCalledWith('Password reset successfully');
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });

    test('handles password reset error', async () => {
      await waitFor(() => screen.getByLabelText(/reset code/i));

      const tokenInput = screen.getByLabelText(/reset code/i);
      const passwordInput = screen.getByLabelText(/new password/i);
      const submitButton = screen.getByRole('button', { name: /reset password/i });

      await userEvent.type(tokenInput, 'invalid');
      await userEvent.type(passwordInput, 'newpass');
      
      authService.resetPassword.mockRejectedValueOnce(new Error('Invalid token'));
      
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Invalid or expired reset token');
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });

    test('validates required fields in reset form', async () => {
      await waitFor(() => screen.getByRole('button', { name: /reset password/i }));
      
      const submitButton = screen.getByRole('button', { name: /reset password/i });
      
      fireEvent.click(submitButton);

      expect(authService.resetPassword).not.toHaveBeenCalled();
    });
  });
});