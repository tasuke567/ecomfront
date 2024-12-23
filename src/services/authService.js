import api from './api';

export const authService = {

  // ฟังก์ชันตรวจสอบ token
  verifyToken: async (token) => {
    try {
      // ตรวจสอบว่ามี token หรือไม่
      if (!token) {
        throw new Error('No token provided');
      }

      const response = await fetch(`${api}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // ตรวจสอบ content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server response was not JSON');
      }

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Token verification error:', error);
      // ถ้าเกิด error ให้ล้าง token
      localStorage.removeItem('token');
      throw error;
    }
  },

  // ฟังก์ชัน login
  login: async (credentials) => {
    try {
      const response = await fetch(`${api}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  },

  // ฟังก์ชัน logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // ฟังก์ชัน register
  register: async (userData) => {
    try {
      const response = await fetch(`${api}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
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
  logout() {
    api.clearToken();
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
