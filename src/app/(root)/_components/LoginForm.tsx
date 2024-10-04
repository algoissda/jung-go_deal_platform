"use client";

import { useState } from "react";
import { supabase } from "@/app/(root)/utils/supabase";
import { useModalStore } from "@/app/(root)/store/modalStore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { closeModal } = useModalStore();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      // 로그인 성공 시 모달 닫기
      closeModal();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogIn}>
        <div className="mb-4">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          로그인
        </button>
      </form>
    </div>
  );
}
