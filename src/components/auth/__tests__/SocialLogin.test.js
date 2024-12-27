// src/components/auth/__tests__/SocialLogin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin';
import { authService } from '../../../services/authService';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

jest.mock('../../../services/authService', () => ({
  loginWithGoogle: jest.fn(),
  loginWithFacebook: jest.fn()
}));

describe('SocialLogin Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders social login buttons', () => {
    render(<SocialLogin />);
    
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with facebook/i })).toBeInTheDocument();
    expect(screen.getByAltText('Google')).toBeInTheDocument();
    expect(screen.getByAltText('Facebook')).toBeInTheDocument();
  });

  describe('Google Login', () => {
    test('handles successful Google login', async () => {
      render(<SocialLogin />);
      
      authService.loginWithGoogle.mockResolvedValueOnce({
        user: { id: '123', email: 'test@example.com' }
      });
      
      const googleButton = screen.getByRole('button', { name: /continue with google/i });
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(authService.loginWithGoogle).toHaveBeenCalled();
      });
    });

    test('handles Google login error', async () => {
      render(<SocialLogin />);
      
      authService.loginWithGoogle.mockRejectedValueOnce(new Error('Google login failed'));
      
      const googleButton = screen.getByRole('button', { name: /continue with google/i });
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to login with Google');
      });
    });
  });

  describe('Facebook Login', () => {
    test('handles successful Facebook login', async () => {
      render(<SocialLogin />);
      
      authService.loginWithFacebook.mockResolvedValueOnce({
        user: { id: '123', email: 'test@example.com' }
      });
      
      const facebookButton = screen.getByRole('button', { name: /continue with facebook/i });
      fireEvent.click(facebookButton);
      
      await waitFor(() => {
        expect(authService.loginWithFacebook).toHaveBeenCalled();
      });
    });

    test('handles Facebook login error', async () => {
      render(<SocialLogin />);
      
      authService.loginWithFacebook.mockRejectedValueOnce(new Error('Facebook login failed'));
      
      const facebookButton = screen.getByRole('button', { name: /continue with facebook/i });
      fireEvent.click(facebookButton);
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Failed to login with Facebook');
      });
    });
  });
});