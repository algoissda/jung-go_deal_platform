"use client";

import { useState } from "react";
import { supabase } from "@/app/(root)/utils/supabase";
import { useRouter } from "next/router";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      // 로그인 성공 시 홈 페이지로 이동
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1>로그인</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogIn}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
