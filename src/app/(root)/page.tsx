import { useModalStore } from "@/app/(root)/store/modalStore";
import Modal from "@/app/(root)/_components/Modal";
import LoginForm from "@/app/(root)/_components/LoginForm";

export default function HomePage() {
  const { openModal, isOpen } = useModalStore();

  return (
    <div>
      <h1>중고마켓</h1>
      <button onClick={openModal}>로그인</button>

      {/* 모달이 열리면 로그인 폼을 표시 */}
      {isOpen && (
        <Modal>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}
