// src/services/__tests__/authService.test.js
import axios from 'axios';
import { authService } from '../authService';
import { tokenService } from '../tokenService';

jest.mock('axios');
jest.mock('../tokenService');

describe('AuthService', () => {
  const mockBaseURL = 'http://localhost:3001/api/auth';

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Login', () => {
    const mockCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    test('should make correct API call and store token', async () => {
      const mockResponse = {
        data: {
          user: { id: '1', email: 'test@example.com' },
          token: 'fake-token'
        }
      };

      axios.post.mockResolvedValue(mockResponse);
      const mockSetToken = jest.spyOn(tokenService, 'set');

      const result = await authService.login(mockCredentials);

      expect(axios.post).toHaveBeenCalledWith(
        `${mockBaseURL}/login`,
        {
          email: mockCredentials.email.toLowerCase(),
          password: mockCredentials.password
        }
      );
      expect(mockSetToken).toHaveBeenCalledWith('fake-token');
      expect(result).toEqual(mockResponse.data);
    });

    test('should trim and lowercase email before sending', async () => {
      const mockResponse = { data: { user: {}, token: 'token' }};
      axios.post.mockResolvedValue(mockResponse);

      await authService.login({
        email: '  TEST@EXAMPLE.COM  ',
        password: 'password123'
      });

      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          email: 'test@example.com'
        })
      );
    });

    test('should handle validation errors', async () => {
      await expect(authService.login({ email: '', password: '' }))
        .rejects
        .toThrow('Email is required');

      await expect(authService.login({ email: 'test@example.com', password: '' }))
        .rejects
        .toThrow('Password is required');
    });
  });

  describe('Register', () => {
    const mockUserData = {
      email: 'newuser@example.com',
      password: 'password123',
      username: 'newuser',
      name: 'New User'
    };

    test('should make correct API call and store token', async () => {
      const mockResponse = {
        data: {
          user: { id: '2', email: 'newuser@example.com', name: 'New User' },
          token: 'new-user-token'
        }
      };

      axios.post.mockResolvedValue(mockResponse);
      const mockSetToken = jest.spyOn(tokenService, 'set');

      const result = await authService.register(mockUserData);

      expect(axios.post).toHaveBeenCalledWith(
        `${mockBaseURL}/register`,
        expect.objectContaining({
          email: mockUserData.email.toLowerCase(),
          username: mockUserData.username
        })
      );
      expect(mockSetToken).toHaveBeenCalledWith('new-user-token');
      expect(result).toEqual(mockResponse.data);
    });

    test('should validate required fields', async () => {
      const validations = [
        { data: {}, error: 'Username is required' },
        { data: { username: 'test' }, error: 'Email is required' },
        { data: { username: 'test', email: 'test@example.com' }, error: 'Password is required' }
      ];

      for (const validation of validations) {
        await expect(authService.register(validation.data))
          .rejects
          .toThrow(validation.error);
      }
    });

    test('should validate email format', async () => {
      const invalidEmails = [
        'not-an-email',
        'missing@domain',
        '@incomplete.com',
        'spaces in@email.com'
      ];

      for (const email of invalidEmails) {
        await expect(authService.register({
          ...mockUserData,
          email
        })).rejects.toThrow('Invalid email format');
      }
    });

    test('should validate password strength', async () => {
      const weakPasswords = [
        'short',          // too short
        'onlylowercase',  // missing uppercase
        'ONLYUPPERCASE',  // missing lowercase
        'NoNumbers',      // missing numbers
      ];

      for (const password of weakPasswords) {
        await expect(authService.register({
          ...mockUserData,
          password
        })).rejects.toThrow(/Password must/);
      }
    });
  });

  describe('Profile Management', () => {
    const mockToken = 'user-token';
    const mockUserData = {
      name: 'Updated Name',
      email: 'updated@example.com'
    };

    test('should update profile with correct API call', async () => {
      const mockResponse = {
        data: {
          ...mockUserData,
          id: '1'
        }
      };

      tokenService.get.mockReturnValue(mockToken);
      axios.patch.mockResolvedValue(mockResponse);

      const result = await authService.updateProfile(mockUserData);

      expect(axios.patch).toHaveBeenCalledWith(
        `${mockBaseURL}/profile`,
        mockUserData,
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result).toEqual(mockResponse.data);
    });

    test('should handle file uploads correctly', async () => {
      const file = new File([''], 'avatar.jpg', { type: 'image/jpeg' });
      const profileWithFile = {
        ...mockUserData,
        avatar: file
      };

      const mockResponse = { data: { message: 'Profile updated' } };
      axios.patch.mockResolvedValue(mockResponse);
      tokenService.get.mockReturnValue(mockToken);

      await authService.updateProfile(profileWithFile);

      expect(axios.patch).toHaveBeenCalledWith(
        `${mockBaseURL}/profile`,
        expect.any(FormData),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data'
          })
        })
      );
    });
  });

  describe('Authentication Status', () => {
    test('should verify token', async () => {
      const mockToken = 'valid-token';
      const mockUser = { id: '1', email: 'test@example.com' };

      tokenService.get.mockReturnValue(mockToken);
      axios.get.mockResolvedValue({ data: { user: mockUser } });

      const result = await authService.verifyToken();

      expect(axios.get).toHaveBeenCalledWith(
        `${mockBaseURL}/verify`,
        { headers: { Authorization: `Bearer ${mockToken}` } }
      );
      expect(result).toEqual(mockUser);
    });

    test('should handle missing token', async () => {
      tokenService.get.mockReturnValue(null);
      const result = await authService.verifyToken();
      expect(result).toBeNull();
    });
  });

  describe('Error Handling', () => {
    test('should handle authentication errors', async () => {
      const mockError = {
        response: {
          data: { message: 'Invalid credentials' },
          status: 401
        }
      };

      axios.post.mockRejectedValue(mockError);
      const mockRemoveToken = jest.spyOn(tokenService, 'remove');

      await expect(authService.login({
        email: 'test@example.com',
        password: 'wrongpassword'
      })).rejects.toThrow('Invalid credentials');

      expect(mockRemoveToken).toHaveBeenCalled();
    });

    test('should handle network errors', async () => {
      const mockError = new Error('Network Error');
      axios.post.mockRejectedValue(mockError);

      await expect(authService.login({
        email: 'test@example.com',
        password: 'password123'
      })).rejects.toThrow('Network Error');
    });

    test('should handle server errors', async () => {
      const mockError = {
        response: {
          data: { message: 'Internal server error' },
          status: 500
        }
      };

      axios.post.mockRejectedValue(mockError);

      await expect(authService.login({
        email: 'test@example.com',
        password: 'password123'
      })).rejects.toThrow('Internal server error');
    });
  });
});