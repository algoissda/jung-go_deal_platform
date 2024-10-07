"use client";

import { ReactNode } from "react";
import { useModalStore } from "@/app/(root)/store/modalStore";
import LoginModal from "./_components/LoginModal";
import Header from "./_components/Header";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { isOpen, closeModal } = useModalStore();

  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        {isOpen && <LoginModal onClose={closeModal} />}
      </body>
    </html>
  );
}
