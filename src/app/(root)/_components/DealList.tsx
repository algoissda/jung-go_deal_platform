"use client";

import { useEffect, useState } from "react";
import DealItem from "./DealItem";
import { supabase } from "@/app/(root)/utils/supabase";

interface Deal {
  id: number;
  title: string;
  price: string;
  location: string;
  interest: number;
  imageUrl: string;
}

export default function DealList() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase.from("deals").select("*");
      if (error) {
        console.error("Error fetching deals:", error);
      } else {
        setDeals(data);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">전체 판매글</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <DealItem key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
}
