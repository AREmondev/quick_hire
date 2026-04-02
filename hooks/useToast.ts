import { create } from "zustand";

interface ToastState {
  message: string | null;
  type: "success" | "error" | "info";
  show: (message: string, type: ToastState["type"]) => void;
  hide: () => void;
}

export const useToast = create<ToastState>((set) => ({
  message: null,
  type: "info",
  show: (message, type) => set({ message, type }),
  hide: () => set({ message: null }),
}));
