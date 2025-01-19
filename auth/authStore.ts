import { create } from 'zustand';

interface AuthState {
    isLogged: string | null;
    setIsLogged: (value: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLogged: null,
    setIsLogged: (value) => set({ isLogged: value }),
}));
