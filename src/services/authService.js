import api from './api';

export const authService = {

  // authService.js
  register: async (userData) => {
    try {
      console.log('Sending registration data:', userData);

      // Client-side validation
      if (!userData.username?.trim()) {
        throw new Error('Username is required');
      }

      if (!userData.email?.trim()) {
        throw new Error('Email is required');
      }

      if (!userData.password) {
        throw new Error('Password is required');
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format');
      }

      // Username validation (alphanumeric and underscore only)
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(userData.username)) {
        throw new Error('Username must be 3-20 characters long and can only contain letters, numbers, and underscores');
      }

      // Password strength validation
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const response = await api.post(
        '/auth/register',
        {
          username: userData.username.trim(),
          email: userData.email.toLowerCase().trim(),
          password: userData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw error;
      } else {
        throw new Error('Registration failed');
      }
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
      }
      return { token, user };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await api.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.user;
    } catch (error) {
      console.error('Token verification error:', error.response?.data || error.message);
      localStorage.removeItem('token');
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  setSession(data) {
    if (data.token) {
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }
  },


  async googleLogin(credential) {
    try {
      if (!credential) {
        throw new Error('No credential provided');
      }
      const response = await api.post('/auth/google', {
        credential: credential,
      });

      if (response.data) {
        // จัดการ token ถ้ามี
        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
        }
        return response.data;
      }
      throw new Error('Invalid response from server');

    } catch (error) {
      console.error('Google login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
  async updateProfile(userData) {
    try {
      let formData;

      // Check if there's a file to upload
      if (userData.avatar instanceof File) {
        formData = new FormData();
        formData.append('avatar', userData.avatar);
        Object.keys(userData).forEach(key => {
          if (key !== 'avatar') {
            formData.append(key, userData[key]);
          }
        });
      } else {
        formData = userData;
      }

      const response = await api.put('/api/user/profile', formData, {
        headers: {
          'Content-Type': userData.avatar instanceof File ? 'multipart/form-data' : 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
