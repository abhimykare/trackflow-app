import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, tokenManager } from '../config/api';
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  User,
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

  getCurrentUser: async (): Promise<User> => {
    try {
      const userData = await tokenManager.getUserData();
      if (!userData) {
        throw new Error('No user data found');
      }
      console.log(
        '[AuthService] 👤 Current user retrieved:',
        userData.fullName,
      );
      return userData;
    } catch (error) {
      console.error('[AuthService] ❌ Get current user failed:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await tokenManager.removeToken();
      console.log('[AuthService] ✅ Logout successful');
    } catch (error) {
      console.error('[AuthService] ❌ Logout failed:', error);
      throw error;
    }
  },
};

// Custom hooks
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async data => {
      try {
        console.log('[AuthService] 💾 Storing registration data...');

        await tokenManager.setToken(data.data.token);
        await tokenManager.setUserData(data.data.user);
        queryClient.setQueryData(['currentUser'], data.data.user);

        console.log('[AuthService] ✅ Registration process completed');
      } catch (error) {
        console.error(
          '[AuthService] ❌ Error storing registration data:',
          error,
        );
        throw error;
      }
    },
    onError: (error: any) => {
      console.error(
        '[AuthService] ❌ Registration mutation failed:',
        error.response?.data || error.message,
      );
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async data => {
      try {
        console.log('[AuthService] 💾 Storing login data...');

        await tokenManager.setToken(data.data.token);
        await tokenManager.setUserData(data.data.user);
        queryClient.setQueryData(['currentUser'], data.data.user);

        console.log('[AuthService] ✅ Login process completed');
      } catch (error) {
        console.error('[AuthService] ❌ Error storing login data:', error);
        throw error;
      }
    },
    onError: (error: any) => {
      console.error(
        '[AuthService] ❌ Login mutation failed:',
        error.response?.data || error.message,
      );
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    // Enable auto-fetch so user data is available immediately
    enabled: true,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      console.log('[AuthService] ✅ Logout completed, cache cleared');
    },
  });
};

// Enhanced auth status hook for navigation
export const useAuthStatus = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  const isAuthenticated = !!user && !error;

  console.log('[AuthService] Auth Status Check:', {
    hasUser: !!user,
    hasError: !!error,
    isAuthenticated,
    isLoading,
  });

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    // Helper functions for easy access to user data
    userName: user?.fullName || '',
    userEmail: user?.email || '',
    userPreferences: user?.preferences,
    monthlyIncome: user?.monthlyIncome,
    currency: user?.preferences?.currency || 'INR',
    theme: user?.preferences?.theme || 'dark',
  };
};

console.log('[AuthService] ✅ Auth service loaded successfully');
