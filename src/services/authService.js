import api from "./api";

const ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  GOOGLE_LOGIN: "/auth/google",
  VERIFY_TOKEN: "/auth/verify",
  UPDATE_PROFILE: "/api/user/profile",
};

export const authService = {
  register: async (userData) => {
    try {
      validateRegistration(userData);

      const response = await api.post(ENDPOINTS.REGISTER, {
        username: userData.username.trim(),
        email: userData.email.toLowerCase().trim(),
        password: userData.password,
      });

      const data = validateResponse(response);
      return formatUserResponse(data);
    } catch (error) {
      handleApiError(error, "Registration failed");
    }
  },

  login: async (credentials) => {
    try {
      validateCredentials(credentials);

      const response = await api.post(ENDPOINTS.LOGIN, {
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password,
      });

      const data = validateResponse(response);

      // Normalize user data
      const normalizedUser = {
        id: data.user.id || data.user._id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role,
      };

      // Store session
      authService.setSession({ user: normalizedUser, token: data.token });

      return { user: normalizedUser, token: data.token };
    } catch (error) {
      handleApiError(error, "Login failed");
    }
  },

  googleLogin: async (credential) => {
    try {
      if (!credential) throw new Error("No credential provided");

      const response = await api.post(ENDPOINTS.GOOGLE_LOGIN, { credential });
      const data = validateResponse(response);

      authService.setSession(data);
      return formatUserResponse(data);
    } catch (error) {
      handleApiError(error, "Google login failed");
    }
  },

  verifyToken: async () => {
    try {
      const token = authService.getToken();
      if (!token) return null;

      const response = await api.get(ENDPOINTS.VERIFY_TOKEN);
      return validateResponse(response).user;
    } catch (error) {
      authService.clearSession();
      handleApiError(error, "Token verification failed");
    }
  },

  updateProfile: async (userData) => {
    try {
      const formData = createFormData(userData);
      const headers =
        formData instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" };

      const response = await api.put(ENDPOINTS.UPDATE_PROFILE, formData, {
        headers,
      });
      return validateResponse(response);
    } catch (error) {
      handleApiError(error, "Profile update failed");
    }
  },

  setSession: (data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      api.setToken(data.token);
    }
  },

  clearSession: () => {
    localStorage.removeItem("token");
    api.clearToken();
  },

  logout: (redirect = true) => {
    authService.clearSession();
    if (redirect) {
      window.location.href = "/login"; // Adjust as necessary for SPA navigation
    }
  },

  isAuthenticated: () => !!localStorage.getItem("token"),

  getToken: () => localStorage.getItem("token"),
};

// Helper Functions
const validateRegistration = (userData) => {
  const { username, email, password } = userData;

  if (!username?.trim()) throw new Error("Username is required");
  if (!email?.trim()) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Invalid email format");
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username))
    throw new Error(
      "Username must be 3-20 characters long and can only contain letters, numbers, and underscores"
    );
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters long");
};

const validateCredentials = (credentials) => {
  const { email, password } = credentials;

  if (!email?.trim()) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Invalid email format");
};

const validateResponse = (response) => {
  if (!response || !response.data) {
    throw new Error("No response received from the server");
  }

  const data = response.data;

  if (!data.user || !data.token) {
    throw new Error("Invalid response structure: Missing required fields");
  }

  return data;
};

const formatUserResponse = (data) => {
  const { user, token } = data;

  if (!user || !token)
    throw new Error("Invalid response format: Missing user or token");

  const { id, username, email, role } = user;

  if (!id && !user._id) throw new Error("Invalid response: Missing user ID");

  return {
    user: { id: id || user._id, username, email, role },
    token,
  };
};

const createFormData = (userData) => {
  const formData = new FormData();
  
  if (userData.avatar instanceof File) {
    formData.append("avatar", userData.avatar);
  }

  Object.keys(userData).forEach((key) => {
    if (key !== "avatar") {
      formData.append(key, userData[key]);
    }
  });

  return formData;
};

const handleApiError = (error, defaultMessage) => {
  const isNetworkError = !error.response;

  console.error("API Error Details:", {
    name: error.name,
    message: error.message,
    response: error.response?.data || "No response data",
    status: error.response?.status || "No status",
  });

  if (isNetworkError) {
    throw new Error("Network error: Unable to reach the server");
  }

  if (error.response?.status === 401) {
    authService.clearSession();
    throw new Error("Unauthorized: Invalid credentials");
  }

  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }

  throw new Error(defaultMessage);
};

export default authService;
