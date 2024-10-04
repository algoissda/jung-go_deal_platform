import { Deal } from "@/app/(root)/store/dealStore";
import Link from "next/link";

interface DealItemProps {
  deal: Deal;
}

export default function DealItem({ deal }: DealItemProps) {
  return (
    <div className="deal-item">
      <Link href={`/deals/${deal.id}`}>
        <h2>{deal.title}</h2>
      </Link>
      <p>{deal.price}원</p>
      <p>{deal.location}</p>
    </div>
  );
}
