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
  async googleLogin(tokenId) {
    try {
      console.log('Sending Google token:', tokenId);
      const response = await api.post('/auth/google', { token: tokenId });
      this.setSession(response.data); // เพิ่มบรรทัดนี้เพื่อจัดการ token
      return response.data;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

};
