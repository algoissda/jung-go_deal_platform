import { useRouter } from "next/router";
import { useDealStore } from "@/app/(root)/store/dealStore";
import DealDetail from "@/app/(root)/_components/DealDetail";

export default function DealDetailPage() {
  const router = useRouter();
  const { dealId } = router.query;
  const { deals } = useDealStore();
  const deal = deals.find((d) => d.id === Number(dealId));

  if (!deal) return <div>판매글을 찾을 수 없습니다.</div>;

  return <DealDetail deal={deal} />;
}
