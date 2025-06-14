import axios, { AxiosInstance } from 'axios';
import storage from '../utils/storage';

const BASE_URL = 'http://10.0.2.2:5001/api'; // Android emulator

console.log('[API] Initializing API with base URL:', BASE_URL);

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // Increased timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async config => {
    try {
      console.log('[API] Making request to:', config.url);
      const token = await storage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[API] ✅ Added auth token to request');
      } else {
        console.log('[API] ℹ️ No auth token found');
      }
    } catch (error) {
      console.error('[API] ❌ Error getting token from storage:', error);
    }
    return config;
  },
  error => {
    console.error('[API] ❌ Request interceptor error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  response => {
    console.log(
      '[API] ✅ Response received:',
      response.status,
      response.config.url,
    );
    return response;
  },
  async error => {
    const status = error.response?.status;
    const url = error.config?.url;
    console.error(
      '[API] ❌ Response error:',
      status,
      url,
      error.response?.data,
    );

    if (status === 401) {
      console.log('[API] 🔄 Token expired, clearing storage');
      try {
        await storage.removeItem('authToken');
        await storage.removeItem('userData');
      } catch (storageError) {
        console.error('[API] ❌ Error clearing storage:', storageError);
      }
    }
    return Promise.reject(error);
  },
);

// Token management functions
const tokenManager = {
  setToken: async (token: string): Promise<void> => {
    try {
      await storage.setItem('authToken', token);
      console.log('[TokenManager] ✅ Token stored successfully');
    } catch (error) {
      console.error('[TokenManager] ❌ Error storing token:', error);
      throw error;
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      const token = await storage.getItem('authToken');
      console.log('[TokenManager] Token retrieved:', !!token);
      return token;
    } catch (error) {
      console.error('[TokenManager] ❌ Error getting token:', error);
      return null;
    }
  },

  removeToken: async (): Promise<void> => {
    try {
      await storage.removeItem('authToken');
      await storage.removeItem('userData');
      console.log('[TokenManager] ✅ Tokens removed successfully');
    } catch (error) {
      console.error('[TokenManager] ❌ Error removing tokens:', error);
    }
  },

  setUserData: async (userData: any): Promise<void> => {
    try {
      await storage.setItem('userData', JSON.stringify(userData));
      console.log('[TokenManager] ✅ User data stored successfully');
    } catch (error) {
      console.error('[TokenManager] ❌ Error storing user data:', error);
      throw error;
    }
  },

  getUserData: async (): Promise<any> => {
    try {
      const userData = await storage.getItem('userData');
      const parsed = userData ? JSON.parse(userData) : null;
      console.log('[TokenManager] User data retrieved:', !!parsed);
      return parsed;
    } catch (error) {
      console.error('[TokenManager] ❌ Error getting user data:', error);
      return null;
    }
  },
};

console.log('[API] ✅ API configuration loaded successfully');

export { apiClient, tokenManager };
export default { apiClient, tokenManager };
