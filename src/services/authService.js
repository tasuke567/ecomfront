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
      authService.handleError(error, 'Registration failed');
    }
  },

  login: async (credentials) => {
    try {
      console.log('Login credentials:', {
        email: credentials.email.toLowerCase().trim(),
        // Don't log password for security
      });
  
      const response = await api.post('/auth/login', {
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password
      });
  
      // Add more detailed logging
      console.log('Full API Response:', response);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
  
      // More robust response checking
      if (!response || !response.data) {
        throw new Error('No response received from server');
      }
  
      const data = response.data;
  
      if (!data.user || !data.token) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response format: Missing user or token');
      }
  
      authService.setSession(data);
  
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
      // More detailed error logging
      console.error('Login Error Details:', {
        name: error.name,
        message: error.message,
        response: error.response,
        config: error.config
      });
  
      authService.handleError(error, 'Login failed');
    }
  },

  googleLogin: async (credential) => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      if (!credential) throw new Error("No credential provided");
  
      const response = await api.post(ENDPOINTS.GOOGLE_LOGIN, { credential });
  
      if (!response || !response.data) {
        throw new Error("No data received from server");
      }
  
      // ตรวจสอบว่า message และ token ถูกส่งมาอย่างถูกต้อง
      if (response.data.message === "Google login successful" && response.data.user) {
        const data = validateResponse(response);
        authService.setSession(data);
        return formatUserResponse(data);
      } else {
        throw new Error("Invalid response data or login failed");
      }
    } catch (error) {
      handleApiError(error, "Google login failed");
      throw error;  // ให้ error ถูกโยนกลับไปยัง caller function
    }
  },
  
  
  

  verifyToken: async () => {
    try {
      const token = authService.getToken();
      if (!token) return null;

      const response = await api.get(ENDPOINTS.VERIFY_TOKEN);
      return validateResponse(response).user;
    } catch (error) {
      authService.clearSession();
      handleApiError(error, "Token verification failed");
    }
  },

  updateProfile: async (userData) => {
    try {
      const formData = createFormData(userData);
      const headers =
        formData instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" };

      const response = await api.put(ENDPOINTS.UPDATE_PROFILE, formData, {
        headers,
      });
      return validateResponse(response);
    } catch (error) {
      handleApiError(error, "Profile update failed");
=======
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
>>>>>>> parent of d8916c2 (Enhance testing and configuration for Jest in the project. Updated .gitignore to exclude test directories and coverage reports. Improved craco.config.js with comprehensive Jest configuration, including coverage thresholds, test match patterns, and custom render methods for testing with Redux. Refactored setupTests.js to include additional testing utilities and mock implementations. Removed unused App.js and App.test.js files to streamline the codebase.)
=======
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
>>>>>>> parent of d8916c2 (Enhance testing and configuration for Jest in the project. Updated .gitignore to exclude test directories and coverage reports. Improved craco.config.js with comprehensive Jest configuration, including coverage thresholds, test match patterns, and custom render methods for testing with Redux. Refactored setupTests.js to include additional testing utilities and mock implementations. Removed unused App.js and App.test.js files to streamline the codebase.)
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