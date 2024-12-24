import api from './api';

export const authService = {

  // authService.js
  register: async (userData) => {
    try {
      console.log('Starting registration with data:', userData);

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

      const data = await api.post(
        '/auth/register',
        {
          username: userData.username.trim(),
          email: userData.email.toLowerCase().trim(),
          password: userData.password
        }
      );
      console.log('Response data received:', data);

      // ตรวจสอบ response format
      if (data && data.message === 'Registration successful' && data.user) {
        return {
          user: {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role
          },
          message: data.message
        };
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Registration error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('Starting login with credentials:', {
        email: credentials.email,
        hasPassword: !!credentials.password
      });
  
      // Client-side validation
      if (!credentials.email?.trim()) {
        throw new Error('Email is required');
      }
  
      if (!credentials.password) {
        throw new Error('Password is required');
      }
  
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        throw new Error('Invalid email format');
      }
  
      // Password length validation
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
  
      const { data } = await api.post('/auth/login', {
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password
      });
  
      console.log('Login response data:', data);
  
      // ตรวจสอบ response format
      if (data && data.token && data.user) {
        // Store token
        localStorage.setItem('token', data.token);
  
        return {
          user: {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role
          },
          token: data.token
        };
      }
  
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
  
      // Specific error messages
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
  
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
