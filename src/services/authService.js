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
      console.log('Starting Google login process');
      console.log('Request body:', { token: credential });
      
      const response = await api.post('/auth/google', { 
        token: credential 
      });
      
      if (response.data) {
        this.setSession(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error('Google login error in service:', error);
      throw error;
    }

}};
