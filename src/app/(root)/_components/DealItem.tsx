/* eslint-disable @next/next/no-img-element */
interface DealItemProps {
  deal: {
    id: number;
    title: string;
    price: string;
    location: string;
    interest: number;
    imageUrl: string;
  };
}

export default function DealItem({ deal }: DealItemProps) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img
        src={deal.imageUrl}
        alt={deal.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{deal.title}</h3>
        <p className="text-lg font-bold mt-2">{deal.price}</p>
        <p className="text-sm text-gray-500 mt-1">{deal.location}</p>
        <p className="text-sm text-gray-500 mt-1">관심 {deal.interest}</p>
      </div>
    </div>
  );
}
