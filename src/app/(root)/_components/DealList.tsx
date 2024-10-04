import { useDealStore } from "@/app/(root)/store/dealStore";
import DealItem from "./DealItem";

export default function DealList() {
  const { deals } = useDealStore();

  return (
    <div className="deal-list">
      {deals.map((deal) => (
        <DealItem key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
