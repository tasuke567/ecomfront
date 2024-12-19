import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth Services
export const authAPI = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getProfile: () => API.get('/auth/profile'),
};

// Product Services
export const productAPI = {
  getAllProducts: (params) => API.get('/products', { params }),
  getProduct: (id) => API.get(`/products/${id}`),
  searchProducts: (query) => API.get(`/products/search?q=${query}`),
};

// Order Services
export const orderAPI = {
  createOrder: (orderData) => API.post('/orders', orderData),
  getOrders: () => API.get('/orders'),
  getOrder: (id) => API.get(`/orders/${id}`),
};