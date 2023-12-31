import useQueryCards from "@/hooks/use-query-cards";
import Card from "./card";
import { useEffect } from "react";

const Cards = () => {
  const { cards } = useQueryCards();

  useEffect(() => {}, [cards]);

  return (
    <div>
      {cards.length === 0 ? (
        <div className="p-4 text-center border-slate-400">No cards yet.</div>
      ) : (
        cards.map((card) => <Card card={card} key={card.id} />)
      )}
    </div>
  );
};

export default Cards;
