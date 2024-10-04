"use client";

import { useState } from "react";
import { supabase } from "@/app/(root)/utils/supabase";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      // 회원가입 성공 시 로그인 페이지로 이동
      router.push("/log-in");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1>회원가입</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignUp}>
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
