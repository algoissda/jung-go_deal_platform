import { create } from "zustand";
import { supabase } from "@/app/(root)/utils/supabase";
import { User } from "@supabase/supabase-js";

// Zustand로 로그인 상태 관리
interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  initUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  initUser: async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    set({ user: sessionData?.session?.user || null });

    supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        set({ user: session.user });
      } else {
        set({ user: null });
      }
    });
  },
}));
