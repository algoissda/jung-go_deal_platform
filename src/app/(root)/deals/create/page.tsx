"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/(root)/utils/supabase";
import { useModalStore } from "@/app/(root)/store/modalStore";

export default function SellPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const alertShown = useRef(false);
  const router = useRouter();
  const { openModal } = useModalStore();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        setUserId(data.session.user.id);
      } else {
        router.push("/");

        if (!alertShown.current) {
          alertShown.current = true;

          setTimeout(() => {
            openModal();
            alert("로그인 후 판매글을 작성할 수 있습니다.");
          }, 300);
        }
      }
    };

    fetchUser();
  }, [router, openModal]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("deals")
      .upload(filePath, imageFile);

    if (uploadError) {
      setError(uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from("deals").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !location || !price || isNaN(Number(price))) {
      setError("모든 필드를 올바르게 입력하세요.");
      return;
    }

    if (!userId) {
      setError("로그인 후 판매글을 작성할 수 있습니다.");
      return;
    }

    const imageUrl = await uploadImage();
    const numericPrice = Number(price);

    const { error } = await supabase.from("deals").insert([
      {
        title,
        content,
        location,
        price: numericPrice,
        authorId: userId,
        createdAt: new Date(),
        imageUrl,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      router.push("/my-deals");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">판매글 작성하기</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleCreateDeal}>
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
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-sm font-medium">
              이미지 업로드
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            판매글 작성하기
          </button>
        </form>
      </div>
    </div>
  );
}
