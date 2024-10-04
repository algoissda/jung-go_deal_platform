import Modal from "@/app/(root)/_components/Modal";
import { useModalStore } from "@/app/(root)/store/modalStore";
import { useState } from "react";

export default function LoginPage() {
  const { closeModal } = useModalStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 로그인 로직을 추가합니다
    console.log("로그인 시도", { email, password });
    closeModal(); // 로그인 성공 후 모달을 닫음
  };

  return (
    <Modal>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
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
    </Modal>
  );
}
