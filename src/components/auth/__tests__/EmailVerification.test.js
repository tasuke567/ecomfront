// src/components/auth/__tests__/EmailVerification.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EmailVerification from '../EmailVerification';
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
  verifyEmail: jest.fn(),
  resendVerification: jest.fn()
}));

describe('EmailVerification Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('renders verification form', () => {
    render(<EmailVerification />);
    
    expect(screen.getByText(/verify your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter verification code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify email/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resend code/i })).toBeInTheDocument();
  });

  test('handles successful verification', async () => {
    render(<EmailVerification />);
    
    const codeInput = screen.getByPlaceholderText(/enter verification code/i);
    const submitButton = screen.getByRole('button', { name: /verify email/i });

    // Enter verification code
    await userEvent.type(codeInput, '123456');
    
    // Mock successful verification
    authService.verifyEmail.mockResolvedValueOnce({});

    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authService.verifyEmail).toHaveBeenCalledWith('123456');
      expect(toast.success).toHaveBeenCalledWith('Email verified successfully');
      expect(mockNavigate).toHaveBeenCalledWith('/profile');
    });
  });

  test('handles verification error', async () => {
    render(<EmailVerification />);
    
    const codeInput = screen.getByPlaceholderText(/enter verification code/i);
    const submitButton = screen.getByRole('button', { name: /verify email/i });

    await userEvent.type(codeInput, 'wrongcode');
    
    // Mock failed verification
    authService.verifyEmail.mockRejectedValueOnce(new Error('Invalid code'));

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid verification code');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('handles resend verification', async () => {
    render(<EmailVerification />);
    
    const resendButton = screen.getByRole('button', { name: /resend code/i });
    
    // Mock successful resend
    authService.resendVerification.mockResolvedValueOnce({});

    fireEvent.click(resendButton);

    expect(resendButton).toBeDisabled();
    expect(resendButton).toHaveTextContent(/sending/i);

    await waitFor(() => {
      expect(authService.resendVerification).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Verification email sent');
      expect(resendButton).not.toBeDisabled();
      expect(resendButton).toHaveTextContent(/resend code/i);
    });
  });

  test('handles resend error', async () => {
    render(<EmailVerification />);
    
    const resendButton = screen.getByRole('button', { name: /resend code/i });
    
    // Mock failed resend
    authService.resendVerification.mockRejectedValueOnce(new Error('Failed to send'));

    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to send verification email');
      expect(resendButton).not.toBeDisabled();
    });
  });

  test('prevents form submission without code', async () => {
    render(<EmailVerification />);
    
    const submitButton = screen.getByRole('button', { name: /verify email/i });
    
    fireEvent.click(submitButton);

    expect(authService.verifyEmail).not.toHaveBeenCalled();
  });

  test('disables resend button while processing', async () => {
    render(<EmailVerification />);
    
    const resendButton = screen.getByRole('button', { name: /resend code/i });
    
    // Mock slow response
    authService.resendVerification.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    fireEvent.click(resendButton);
    
    expect(resendButton).toBeDisabled();
    expect(resendButton).toHaveTextContent(/sending/i);

    await waitFor(() => {
      expect(resendButton).not.toBeDisabled();
      expect(resendButton).toHaveTextContent(/resend code/i);
    });
  });
});