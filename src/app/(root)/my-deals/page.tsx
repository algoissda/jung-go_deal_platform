"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/(root)/utils/supabase";

export default function MyDealsPage() {
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("authorId", supabase.auth.user()?.id); // 현재 로그인한 사용자만의 판매글 가져오기

      if (error) {
        setError(error.message);
      } else {
        setDeals(data);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">내 판매글</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.length > 0 ? (
            deals.map((deal) => (
              <div
                key={deal.id}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={deal.imageUrl || "/placeholder.png"}
                  alt={deal.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {deal.title}
                  </h3>
                  <p className="text-lg font-bold mt-2">{deal.price}원</p>
                  <p className="text-sm text-gray-500 mt-1">{deal.location}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    관심 {deal.interest}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              등록된 판매글이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
