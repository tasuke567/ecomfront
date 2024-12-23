// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    // Log request details
    console.log('API Request:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      data: config.data
    });
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    // Handle successful auth response
    if (response.data?.token) {
      api.setToken(response.data.token);
    }
    return response;
  },
  (error) => {
    // Log error response
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    // Handle specific error cases
    if (error.response?.status === 401) {
      api.clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
// Token management
const tokenMethods = {
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
  
  clearToken: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

// Add token methods to api object
Object.assign(api, tokenMethods);


export default api;