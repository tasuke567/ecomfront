import { authService } from './authService';
import api from './api';

export const tokenService = {
  refreshTokenPromise: null,

  async refreshToken() {
    try {
      if (this.refreshTokenPromise) {
        return this.refreshTokenPromise;
      }

      this.refreshTokenPromise = api.post('/auth/refresh-token', {
        refreshToken: localStorage.getItem('refreshToken')
      });

      const { data } = await this.refreshTokenPromise;
      authService.setSession(data);

      this.refreshTokenPromise = null;
      return data;
    } catch (error) {
      this.refreshTokenPromise = null;
      throw error;
    }
  },

  setupTokenRefresh() {
    // Intercept 401 errors
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshToken();
            // Retry original request with new token
            return api(originalRequest);
          } catch (refreshError) {
            // Refresh token failed, logout user
            authService.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }
};