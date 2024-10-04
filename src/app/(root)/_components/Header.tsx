"use client";

import Link from "next/link";

export default function Header() {
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
          <Link href="/auth/login">로그인</Link>
        </div>
      </nav>
    </header>
  );
}
