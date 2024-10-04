"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white py-4 shadow-md">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">중고마켓</a>
        </Link>
        <div>
          <Link href="/buy">
            <a className="mr-4">구입하기</a>
          </Link>
          <Link href="/sell">
            <a className="mr-4">판매하기</a>
          </Link>
          <Link href="/my-deals">
            <a className="mr-4">내 판매글</a>
          </Link>
          <Link href="/auth/login">
            <a>로그인</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
