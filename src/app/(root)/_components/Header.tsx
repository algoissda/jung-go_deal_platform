"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/(root)/utils/supabase";

export default function Header() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup subscription when component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null); // 로그아웃 후 세션 초기화
  };

  return (
    <header className="bg-white py-4 shadow-md">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          중고마켓
        </Link>
        <div>
          <Link href="/buy" className="mr-4">
            구입하기
          </Link>
          <Link href="/sell" className="mr-4">
            판매하기
          </Link>
          <Link href="/my-deals" className="mr-4">
            내 판매글
          </Link>
          {session ? (
            // 로그인이 된 경우: 로그아웃 버튼 표시
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            // 로그인이 안된 경우: 로그인/회원가입 링크 표시
            <>
              <Link href="/auth/log-in" className="mr-4">
                로그인
              </Link>
              <Link href="/auth/sign-up">회원가입</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
