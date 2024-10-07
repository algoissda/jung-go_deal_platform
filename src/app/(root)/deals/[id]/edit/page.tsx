"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/(root)/utils/supabase";

export default function EditDealPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchDeal = async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("판매글을 불러오지 못했습니다.");
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setLocation(data.location);
      setPrice(data.price);
    };

    fetchDeal();
  }, [id]);

  const handleUpdateDeal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !location || !price) {
      setError("모든 필드를 입력하세요.");
      return;
    }

    const { error } = await supabase
      .from("deals")
      .update({
        title,
        content,
        location,
        price: Number(price),
      })
      .eq("id", id);

    if (error) {
      setError("판매글을 수정하지 못했습니다.");
    } else {
      router.push(`/deals/${id}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">판매글 수정하기</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleUpdateDeal}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              글 제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2 text-sm font-medium">
              글 내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium"
            >
              직거래 위치
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-sm font-medium">
              판매 가격
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            판매글 수정하기
          </button>
        </form>
      </div>
    </div>
  );
}
