import { create } from "zustand";

export interface Deal {
  id: number;
  title: string;
  content: string;
  price: number;
  location: string;
}

interface DealStore {
  deals: Deal[];
  addDeal: (deal: Deal) => void;
  updateDeal: (dealId: number, updatedDeal: Deal) => void;
  removeDeal: (dealId: number) => void;
}

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
  addDeal: (deal) =>
    set((state) => ({
      deals: [...state.deals, deal],
    })),
  updateDeal: (dealId, updatedDeal) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === dealId ? updatedDeal : deal
      ),
    })),
  removeDeal: (dealId) =>
    set((state) => ({
      deals: state.deals.filter((deal) => deal.id !== dealId),
    })),
}));
