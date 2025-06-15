import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/auth';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  updateUser: (userData: Partial<User>) => void;

  // Getters
  getUserName: () => string;
  getUserEmail: () => string;
  getCurrency: () => string;
  getTheme: () => string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,

      // Actions
      setAuth: (user: User, token: string) => {
        console.log(
          '[AuthStore] 🔐 Setting authentication data for:',
          user.fullName,
        );
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      clearAuth: () => {
        console.log('[AuthStore] 🚪 Clearing authentication data');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setInitialized: (initialized: boolean) => {
        set({ isInitialized: initialized });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          console.log('[AuthStore] 👤 Updating user data');
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      // Getters
      getUserName: () => {
        const { user } = get();
        return user?.fullName || '';
      },

      getUserEmail: () => {
        const { user } = get();
        return user?.email || '';
      },

      getCurrency: () => {
        const { user } = get();
        return user?.preferences?.currency || 'INR';
      },

      getTheme: () => {
        const { user } = get();
        return user?.preferences?.theme || 'dark';
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        console.log('[AuthStore] 🔄 Rehydrating auth state...');
        if (state) {
          // Validate that we have both user and token
          const isValid = state.user && state.token;
          state.isAuthenticated = isValid;
          state.isInitialized = true;
          console.log('[AuthStore] ✅ Auth state rehydrated:', {
            hasUser: !!state.user,
            hasToken: !!state.token,
            isAuthenticated: state.isAuthenticated,
          });
        }
      },
    },
  ),
);

// Selector hooks for better performance
export const useAuthUser = () => useAuthStore(state => state.user);
export const useAuthToken = () => useAuthStore(state => state.token);
export const useIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);
export const useAuthInitialized = () =>
  useAuthStore(state => state.isInitialized);
