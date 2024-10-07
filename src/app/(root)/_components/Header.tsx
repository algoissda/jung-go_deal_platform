"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/(root)/store/authStore"; // Zustand로 로그인 상태 관리
import { useModalStore } from "@/app/(root)/store/modalStore"; // 로그인 모달 상태 관리
import Link from "next/link";
import { supabase } from "../utils/supabase";

export default function Header() {
  const { user, initUser, clearUser } = useAuthStore(); // Zustand로 로그인 상태 관리
  const { openModal } = useModalStore(); // 로그인 모달 제어 함수

  // 페이지 로드 시 로그인 상태 초기화
  useEffect(() => {
    initUser(); // 로그인 상태 초기화
  }, [initUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser(); // 로그아웃 후 유저 상태 초기화
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="flex justify-between p-4 max-w-screen-xl mx-auto">
          <Link href="/" className="text-xl font-bold">
            중고마켓
          </Link>
          <nav className="space-x-4">
            <Link href="/deals/create" className="text-gray-700">
              판매하기
            </Link>
            <Link href="/my-deals" className="text-gray-700">
              내 판매글
            </Link>
            {user ? (
              <button onClick={handleLogout} className="text-gray-700">
                로그아웃
              </button>
            ) : (
              <>
                <button onClick={openModal} className="text-gray-700">
                  로그인
                </button>
                <Link href="/auth/sign-up" className="text-gray-700">
                  회원가입
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
