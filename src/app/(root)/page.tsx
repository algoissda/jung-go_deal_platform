"use client";

import Header from "@/app/(root)/_components/Header";
import DealList from "@/app/(root)/_components/DealList";
import Modal from "@/app/(root)/_components/Modal";
import LoginForm from "@/app/(root)/_components/LoginForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto py-8">
        <DealList />
      </main>
      {/* 로그인 모달 */}
      <Modal>
        <LoginForm />
      </Modal>
    </div>
  );
}
