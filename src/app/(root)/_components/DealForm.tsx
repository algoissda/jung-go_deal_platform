import { useState } from "react";
import { Deal } from "@/app/(root)/store/dealStore";

interface DealFormProps {
  onSubmit: (deal: Omit<Deal, "id">) => void;
  initialDeal?: Omit<Deal, "id">;
}

export default function DealForm({ onSubmit, initialDeal }: DealFormProps) {
  const [title, setTitle] = useState(initialDeal?.title || "");
  const [content, setContent] = useState(initialDeal?.content || "");
  const [price, setPrice] = useState(initialDeal?.price || "");
  const [location, setLocation] = useState(initialDeal?.location || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      price: Number(price),
      location,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="가격"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="위치"
      />
      <button type="submit">저장</button>
    </form>
  );
}
