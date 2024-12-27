import axios from 'axios';
import { toast } from 'react-hot-toast';

// สร้าง instance ของ axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL ของ API Server
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // Timeout 10 วินาที
});

// ฟังก์ชันจัดการ Token
const tokenMethods = {
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
  getToken: () => localStorage.getItem('token'),
  clearToken: () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  },
  initializeToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },
};

// Interceptor สำหรับ Request
api.interceptors.request.use(
  (config) => {
    const token = tokenMethods.getToken();
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor สำหรับ Response
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        url: response.config.url,
        method: response.config.method,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      error.response = {
        data: {
          message: 'Network error. Please check your connection.',
        },
      };
      error.type = 'network';
    } else if (error.code === 'ECONNABORTED') {
      error.response = {
        data: {
          message: 'Request timed out. Please try again.',
        },
      };
      error.type = 'timeout';
    } else {
      error.type = 'server';
    }

    if (error.response?.status === 401) {
      toast.error("Your session has expired. Please log in again.");
      tokenMethods.clearToken();
      window.location.href = '/login';
    }

    console.error('API Error:', error.response);
    toast.error(error.response?.data?.message || "Something went wrong.");
    return Promise.reject(error);
  }
);

// Utility Methods สำหรับเรียก API
const apiMethods = {
  async get(url, config = {}) {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async post(url, data = {}, config = {}) {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async put(url, data = {}, config = {}) {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async delete(url, config = {}) {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// รวม Method ทั้งหมด
const enhancedApi = {
  ...api,
  ...tokenMethods,
  ...apiMethods,
};

// เรียกใช้ initializeToken เมื่อไฟล์นี้ถูกโหลด
enhancedApi.initializeToken();

export default enhancedApi;
