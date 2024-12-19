// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6763c5ae3d1a0800085f0e92--comfronteiei.netlify.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;