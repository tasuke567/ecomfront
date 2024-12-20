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
    const response = await api.post('/api/auth/google', { credential });
    return response.data;
  },

  async facebookLogin(accessToken) {
    const response = await api.post('/api/auth/facebook', { accessToken });
    return response.data;
  }

};
