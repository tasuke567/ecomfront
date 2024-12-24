// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Token management
const tokenMethods = {
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  clearToken: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  },

  // Initialize token from localStorage on app start
  initializeToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Check for token on each request
    const token = tokenMethods.getToken();
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Handle different types of errors
    const errorResponse = {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    };

    console.error('API Error:', errorResponse);

    // Handle authentication errors
    if (error.response?.status === 401) {
      tokenMethods.clearToken();
      // Optionally dispatch a logout action or redirect
      window.location.href = '/login';
    }

    // Handle network errors
    if (!error.response) {
      error.response = {
        data: {
          message: 'Network error. Please check your connection.'
        }
      };
    }

    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      error.response = {
        data: {
          message: 'Request timed out. Please try again.'
        }
      };
    }

    return Promise.reject(error);
  }
);

// Add utility methods for common API operations
const apiMethods = {
  // GET request with error handling
  async get(url, config = {}) {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request with error handling
  async post(url, data = {}, config = {}) {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request with error handling
  async put(url, data = {}, config = {}) {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request with error handling
  async delete(url, config = {}) {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Combine all methods
const enhancedApi = {
  ...api,
  ...tokenMethods,
  ...apiMethods
};

// Initialize token on import
enhancedApi.initializeToken();

export default enhancedApi;