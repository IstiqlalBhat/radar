import { create } from 'zustand';
import type { AuthState, AnonymousUser, AuthTokens } from '../types/auth.types';

interface AuthActions {
    setUser: (user: AnonymousUser | null) => void;
    setTokens: (tokens: AuthTokens | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
    updateTrustScore: (score: number) => void;
}

const initialState: AuthState = {
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true, // Initially loading to check stored auth
    error: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
    ...initialState,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: user !== null,
        }),

    setTokens: (tokens) =>
        set({
            tokens,
            isAuthenticated: tokens !== null,
        }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    logout: () =>
        set({
            ...initialState,
            isLoading: false,
        }),

    updateTrustScore: (score) =>
        set((state) => ({
            user: state.user
                ? { ...state.user, trustScore: score }
                : null,
        })),
}));
