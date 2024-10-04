import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      isOpen: false,
      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false }),
    }),
    {
      name: "modal-storage", // 상태를 유지하기 위한 key
      getStorage: () => localStorage, // 상태 저장을 localStorage에 유지
    }
  )
);
