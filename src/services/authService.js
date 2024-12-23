import api from './api';

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    this.setSession(response.data);
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  setSession(data) {
    if (data.token) {
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }
  },

  logout() {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
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
