import api from './api';

export const authService = {
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

      // Username validation
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
      if (!usernameRegex.test(userData.username)) {
        throw new Error('Username must be 3-20 characters long and can only contain letters, numbers, and underscores');
      }

      // Password validation
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const response = await api.post('/auth/register', {
        username: userData.username.trim(),
        email: userData.email.toLowerCase().trim(),
        password: userData.password
      });

      const data = response.data;
      console.log('Registration response:', data);

      if (!data || !data.user) {
        throw new Error('Invalid response format');
      }

      return {
        user: {
          id: data.user.id || data.user._id,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role
        },
        message: data.message
      };
    } catch (error) {
      this.handleError(error, 'Registration failed');
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password
      });

      const data = response.data;
      console.log('Login response:', data);

      if (!data || !data.user || !data.token) {
        throw new Error('Invalid response format');
      }

      this.setSession(data);

      return {
        user: {
          id: data.user.id || data.user._id,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role
        },
        token: data.token
      };
    } catch (error) {
      this.handleError(error, 'Login failed');
    }
  },

  googleLogin: async (credential) => {
    try {
      if (!credential) {
        throw new Error('No credential provided');
      }

      const response = await api.post('/auth/google', { credential });
      const data = response.data;

      if (!data || !data.user) {
        throw new Error('Invalid response format');
      }

      this.setSession(data);

      return {
        user: data.user,
        token: data.token
      };
    } catch (error) {
      this.handleError(error, 'Google login failed');
    }
  },

  setSession: (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      api.setToken(data.token);
    }
  },

  clearSession: () => {
    localStorage.removeItem('token');
    api.clearToken();
  },

  logout: () => {
    authService.clearSession();
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await api.get('/auth/verify');
      return response.data.user;
    } catch (error) {
      authService.clearSession();
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const formData = userData.avatar instanceof File 
        ? this.createFormData(userData)
        : userData;

      const response = await api.put('/api/user/profile', formData, {
        headers: {
          'Content-Type': userData.avatar instanceof File 
            ? 'multipart/form-data' 
            : 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      this.handleError(error, 'Profile update failed');
    }
  },

  // Helper methods
  createFormData: (userData) => {
    const formData = new FormData();
    formData.append('avatar', userData.avatar);
    
    Object.keys(userData).forEach(key => {
      if (key !== 'avatar') {
        formData.append(key, userData[key]);
      }
    });

    return formData;
  },

  handleError: (error, defaultMessage) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    if (error.response?.status === 401) {
      authService.clearSession();
      throw new Error('Session expired. Please login again.');
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error(defaultMessage);
  }
};

export default authService;