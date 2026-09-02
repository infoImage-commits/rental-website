import { create } from "zustand";

type HeaderState = {
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const useHeaderStore = create<HeaderState>((set) => ({
  menuOpen: false,
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
}));
