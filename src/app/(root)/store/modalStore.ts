import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// Zustand로 모달 상태 관리
export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      isOpen: false, // 초기값: 모달 닫힘 상태
      openModal: () => set({ isOpen: true }), // 모달 열기
      closeModal: () => set({ isOpen: false }), // 모달 닫기
    }),
    { name: "modal-storage" } // persist storage 이름 (선택사항)
  )
);
