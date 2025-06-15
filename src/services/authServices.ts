import { apiClient } from '../config/api';
import { useAuthStore } from '../store/authStore';

import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from '../types/auth';

console.log('[AuthService] 🚀 Loading auth service...');

// API functions
const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      console.log('[AuthService] 📝 Starting registration...');
      const response = await apiClient.post('/auth/register', data);
      console.log('[AuthService] ✅ Registration successful:', response.status);
      return response.data;
    } catch (error: any) {
      console.error(
        '[AuthService] ❌ Registration failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      console.log('[AuthService] 🔐 Starting login...');
      const response = await apiClient.post('/auth/login', data);
      console.log('[AuthService] ✅ Login successful:', response.status);
      return response.data;
    } catch (error: any) {
      console.error(
        '[AuthService] ❌ Login failed:',
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Optional: Call logout endpoint if your API has one
      // await apiClient.post('/auth/logout');
      console.log('[AuthService] ✅ Logout successful');
    } catch (error) {
      console.error('[AuthService] ❌ Logout failed:', error);
      throw error;
    }
  },
};

// Auth service functions
export const authService = {
  register: async (data: RegisterRequest): Promise<void> => {
    const { setAuth, setLoading } = useAuthStore.getState();

    try {
      setLoading(true);
      console.log('[AuthService] 📝 Processing registration...');

      const response = await authApi.register(data);

      if (response.success && response.data) {
        const { user, token } = response.data;
        setAuth(user, token);
        console.log(
          '[AuthService] ✅ Registration completed for:',
          user.fullName,
        );
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('[AuthService] ❌ Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  login: async (data: LoginRequest): Promise<void> => {
    const { setAuth, setLoading } = useAuthStore.getState();

    try {
      setLoading(true);
      console.log('[AuthService] 🔐 Processing login...');

      const response = await authApi.login(data);

      if (response.success && response.data) {
        const { user, token } = response.data;
        setAuth(user, token);
        console.log('[AuthService] ✅ Login completed for:', user.fullName);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('[AuthService] ❌ Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  logout: async (): Promise<void> => {
    const { clearAuth, setLoading } = useAuthStore.getState();

    try {
      setLoading(true);
      console.log('[AuthService] 🚪 Processing logout...');

      await authApi.logout();
      clearAuth();

      console.log('[AuthService] ✅ Logout completed');
    } catch (error: any) {
      console.error('[AuthService] ❌ Logout error:', error);
      // Clear auth even if API call fails
      clearAuth();
    } finally {
      setLoading(false);
    }
  },

  // Helper function to check if user is authenticated
  isAuthenticated: (): boolean => {
    const { isAuthenticated } = useAuthStore.getState();
    return isAuthenticated;
  },

  // Get current user
  getCurrentUser: () => {
    const { user } = useAuthStore.getState();
    return user;
  },

  // Get auth token
  getToken: (): string | null => {
    const { token } = useAuthStore.getState();
    return token;
  },
};

console.log('[AuthService] ✅ Auth service loaded successfully');
