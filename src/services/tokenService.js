// src/services/tokenService.js

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenService = {
  // Core token methods
  set(token) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  get() {
    return localStorage.getItem(TOKEN_KEY);
  },

  remove() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  has() {
    return Boolean(this.get());
  },

  // Refresh token methods
  setRefreshToken(token) {
    if (token) {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  clear() {
    this.remove();
  },
};
