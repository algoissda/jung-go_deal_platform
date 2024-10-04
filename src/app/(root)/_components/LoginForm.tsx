import { useState } from "react";
import { useModalStore } from "@/app/(root)/store/modalStore";

export default function LoginForm() {
  const { closeModal } = useModalStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직 추가
    console.log("로그인 시도", { email, password });
    closeModal(); // 로그인 성공 후 모달 닫기
  };

  return (
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
  );
}
