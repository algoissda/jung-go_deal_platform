"use client";

import Link from "next/link";
import { useModalStore } from "@/app/(root)/store/modalStore";
import { supabase } from "@/app/(root)/utils/supabase";
import { useEffect, useState } from "react";

export default function Header() {
  const [session, setSession] = useState(null);
  const { openModal } = useModalStore();

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

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
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
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <button onClick={openModal}>로그인</button>
          )}
        </div>
      </nav>
    </header>
  );
}
