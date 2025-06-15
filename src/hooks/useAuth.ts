'use client';

import { useState } from 'react';
import { authService } from '../services/authServices';

import type { LoginRequest, RegisterRequest } from '../types/auth';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    user,
    isAuthenticated,
    isLoading,
    getUserName,
    getUserEmail,
    getCurrency,
    getTheme,
  } = useAuthStore();

  const login = async (credentials: LoginRequest) => {
    try {
      setError(null);
      await authService.login(credentials);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setError(null);
      await authService.register(userData);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authService.logout();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Logout failed';
      setError(errorMessage);
      // Don't throw error for logout, as we want to clear state anyway
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    clearError,

    // Getters
    userName: getUserName(),
    userEmail: getUserEmail(),
    currency: getCurrency(),
    theme: getTheme(),
  };
};
