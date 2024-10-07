"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/(root)/utils/supabase";
import { useAuthStore } from "@/app/(root)/store/authStore";
import { useModalStore } from "@/app/(root)/store/modalStore";

interface Deal {
  id: string;
  title: string;
  price: number;
  location: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  likesCount?: number;
  views?: number;
}

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = useAuthStore();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [error, setError] = useState<string>("");
  const [isInterested, setIsInterested] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const router = useRouter();
  const { openModal } = useModalStore();

  useEffect(() => {
    const fetchDeal = async () => {
      const { data: dealData, error } = await supabase
        .from("deals")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        setError(error.message);
        return;
      }

      if (!dealData) {
        setError("해당 판매글을 찾을 수 없습니다.");
        return;
      }

      setDeal(dealData);

      if (user) {
        if (dealData.authorId === user.id) {
          setIsAuthor(true);
        } else {
          setIsAuthor(false);
        }

        const { data: interestData } = await supabase
          .from("likes")
          .select("*")
          .eq("dealId", id)
          .eq("userId", user.id)
          .single();

        setIsInterested(Boolean(interestData));
      } else {
        setIsAuthor(false);
        setIsInterested(false);
      }
    };

    fetchDeal();
  }, [id, user]);

  const handleInterestToggle = async () => {
    if (!user) {
      router.push("/");

      setTimeout(() => {
        openModal();
        alert("로그인 후 관심표시를 할 수 있습니다.");
      }, 300);
      return;
    }

    if (isInterested) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("dealId", id)
        .eq("userId", user.id);
      if (!error) {
        setIsInterested(false);
      }
    } else {
      const { error } = await supabase.from("likes").insert({
        dealId: id,
        userId: user.id,
        createdAt: new Date(),
      });
      if (!error) {
        setIsInterested(true);
      }
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("deals").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  const handleEdit = () => {
    router.push(`/deals/${id}/edit`);
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!deal) {
    return <p className="text-center">판매글을 불러오는 중입니다...</p>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto">
        <button onClick={() => router.back()} className="text-blue-500 mb-4">
          ← 돌아가기
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={deal?.imageUrl || "/placeholder.png"}
              alt={deal?.title || "No title available"}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{deal.title}</h1>
            <p className="text-lg font-bold mb-2">
              {deal.price.toLocaleString()}원
            </p>
            <p className="text-sm text-gray-500 mb-2">위치: {deal.location}</p>
            <p className="mb-6">{deal.content}</p>
            <p className="text-sm text-gray-500">
              작성일: {new Date(deal.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              관심 {deal.likesCount || 0} · 조회 {deal.views || 0}
            </p>

            {isAuthor ? (
              <div className="flex space-x-4">
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  글 수정하기
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  글 삭제하기
                </button>
              </div>
            ) : (
              <button
                onClick={handleInterestToggle}
                className={`py-2 px-4 rounded-lg ${
                  isInterested
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {isInterested ? "관심 취소하기" : "관심 표시하기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
