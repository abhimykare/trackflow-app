import axios, { type AxiosInstance } from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL = 'http://10.0.2.2:5001/api'; // Android emulator

console.log('[API] Initializing API with base URL:', BASE_URL);

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async config => {
    try {
      console.log('[API] Making request to:', config.url);

      // Get token from Zustand store
      const token = useAuthStore.getState().token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[API] ✅ Added auth token to request');
      } else {
        console.log('[API] ℹ️ No auth token found');
      }
    } catch (error) {
      console.error('[API] ❌ Error getting token:', error);
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
      console.log('[API] 🔄 Token expired, clearing auth state');
      try {
        // Clear auth state using Zustand
        useAuthStore.getState().clearAuth();
      } catch (clearError) {
        console.error('[API] ❌ Error clearing auth state:', clearError);
      }
    }
    return Promise.reject(error);
  },
);

console.log('[API] ✅ API configuration loaded successfully');

export { apiClient };
export default apiClient;
