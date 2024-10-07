"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/app/(root)/utils/supabase";
import { useModalStore } from "@/app/(root)/store/modalStore";

interface Deal {
  id: string;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
  createdAt: string;
}

export default function MyDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();
  const { openModal } = useModalStore();
  const alertShown = useRef(false);

  useEffect(() => {
    const fetchUserAndDeals = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setError("사용자 정보를 가져오지 못했습니다.");
        return;
      }

      const session = data.session;

      if (!session?.user) {
        router.push("/");

        if (!alertShown.current) {
          alertShown.current = true;

          setTimeout(() => {
            openModal();
            alert("로그인 후 내 판매글을 조회할 수 있습니다.");
          }, 300);
        }
        return;
      }

      setUserId(session.user.id);

      if (type === "bookmark") {
        const { data: bookmarkedDeals, error: bookmarkError } = await supabase
          .from("likes")
          .select(
            `
            dealId,
            deals (id, title, price, location, imageUrl, createdAt)
          `
          )
          .eq("userId", session.user.id);

        if (bookmarkError) {
          setError(bookmarkError.message);
        } else {
          // bookmarkedDeals가 중첩된 배열 형태인 경우, 이를 평탄화하여 할당
          setDeals(bookmarkedDeals.map((item) => item.deals).flat());
        }
      } else {
        const { data: myDeals, error: myDealsError } = await supabase
          .from("deals")
          .select("*")
          .eq("authorId", session.user.id)
          .order("createdAt", { ascending: false });

        if (myDealsError) {
          setError(myDealsError.message);
        } else {
          setDeals(myDeals || []);
        }
      }
    };

    fetchUserAndDeals();
  }, [type, router, openModal]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">내 판매글</h1>

        <div className="flex space-x-4 mb-4">
          <Link
            href="/my-deals?type=write"
            className={`${
              type === "write" || !type
                ? "border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            내 판매글
          </Link>
          <Link
            href="/my-deals?type=bookmark"
            className={`${
              type === "bookmark"
                ? "border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            관심 판매글
          </Link>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.length > 0 ? (
            deals.map((deal) => (
              <Link href={`/deals/${deal.id}`} key={deal.id} className="block">
                <div className="border rounded-lg shadow-md overflow-hidden">
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
                    <p className="text-sm text-gray-500 mt-1">
                      작성일: {new Date(deal.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {type === "bookmark"
                ? "관심 판매글이 없습니다."
                : "등록된 판매글이 없습니다."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
