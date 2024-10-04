import { useModalStore } from "@/app/(root)/store/modalStore";
import LoginPage from "./auth/login/page";

export default function HomePage() {
  const { openModal } = useModalStore();

  return (
    <div>
      <h1>중고마켓</h1>
      <button onClick={openModal}>로그인</button>

      {/* 로그인 모달 표시 */}
      <LoginPage />
    </div>
  );
}
