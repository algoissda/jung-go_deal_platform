import { Deal } from "@/store/dealStore";

interface DealDetailProps {
  deal: Deal;
}

export default function DealDetail({ deal }: DealDetailProps) {
  return (
    <div>
      <h1>{deal.title}</h1>
      <p>{deal.content}</p>
      <p>{deal.price}원</p>
      <p>{deal.location}</p>
    </div>
  );
}
