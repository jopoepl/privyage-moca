import { create } from "zustand";

interface User {
  id: string;
  abstractAccountAddress?: string;
  token?: string;
}

interface UserStore {
  user: User | null;
  isUserLoggedIn: boolean;
  isUserVerified: boolean;
  userVerificationStatus: string | null;
  setUser: (user: User | null) => void;
  setIsUserVerified: (verified: boolean) => void;
  setUserVerificationStatus: (status: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isUserLoggedIn: false,
  isUserVerified: false,
  userVerificationStatus: "Unverified",

  setUser: (user) =>
    set({
      user,
      isUserLoggedIn: !!user,
    }),

  setIsUserVerified: (verified) => set({ isUserVerified: verified }),
  setUserVerificationStatus: (status) =>
    set({ userVerificationStatus: status }),

  logout: () =>
    set({
      user: null,
      isUserLoggedIn: false,
      isUserVerified: false,
    }),
}));
