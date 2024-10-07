"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/(root)/utils/supabase";

interface Deal {
  id: string;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
}

export default function HomePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setDeals((data as Deal[]) || []);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">판매 목록</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.length > 0 ? (
            deals.map((deal) => (
              <Link key={deal.id} href={`/deals/${deal.id}`}>
                <div className="border rounded-lg shadow-md overflow-hidden cursor-pointer">
                  <img
                    src={deal.imageUrl || "/placeholder.png"}
                    alt={deal.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">
                      {deal.title}
                    </h3>
                    <p className="text-lg font-bold mt-2">
                      {deal.price.toLocaleString()}원
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {deal.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">판매글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
