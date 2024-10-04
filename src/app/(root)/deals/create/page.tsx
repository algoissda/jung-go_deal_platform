import DealForm from "@/app/(root)/components/DealForm";
import { useDealStore } from "@/app/(root)/store/dealStore";
import { useRouter } from "next/router";

export default function CreateDealPage() {
  const { addDeal } = useDealStore();
  const router = useRouter();

  const handleSubmit = (deal) => {
    addDeal({ ...deal, id: Date.now() }); // 임시로 ID 생성
    router.push("/");
  };

  return (
    <div>
      <h1>판매글 생성</h1>
      <DealForm onSubmit={handleSubmit} />
    </div>
  );
}
