import { create } from "zustand";

interface UserState {
  username: string | null;
  userId: number | null;
  isAuthenticated: boolean;
  setUsername: (username: string | null) => void;
  setUserId: (userId: number | null) => void;
  setAuthenticated: (state: boolean) => void;
}

export const useUser = create<UserState>((set) => ({
  username: null,
  userId: null,
  isAuthenticated: false,
  setUsername: (username: string | null) => set({ username: username }),
  setUserId: (userId: number | null) => set({ userId: userId }),
  setAuthenticated: (state: boolean) => set({ isAuthenticated: state }),
}));

interface GetPostState {
  getPostTrigger: boolean;
  flipPostTrigger: (state: boolean) => void;
}

export const useGetPostTrigger = create<GetPostState>((set) => ({
  getPostTrigger: true,
  flipPostTrigger: (state: boolean) => set({getPostTrigger: state}),
}))