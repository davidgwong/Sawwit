import { create } from "zustand";

interface UserState {
  username: string | null;
  setUsername: (username: string) => void;
}

export const useUser = create<UserState>((set) => ({
  username: null,
  setUsername: (username: string) => set({ username: username }),
}));

interface authenticatedState {
  isAuthenticated: boolean;
  setAuthenticated: (state: boolean) => void;
}

export const useAuthenticated = create<authenticatedState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (state: boolean) => set({ isAuthenticated: state }),
}));