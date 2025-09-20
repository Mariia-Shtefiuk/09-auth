import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,

  // Встановлюємо користувача і ставимо isAuthenticated в true
  setUser: (user: User) => {
    console.log("User logged in:", user.email);
    set(() => ({ isAuthenticated: true, user }));
  },

  // Логаут: чистимо дані
  clearIsAuthenticated: () => {
    console.log("User logged out");
    set(() => ({ isAuthenticated: false, user: null }));
  },
}));
