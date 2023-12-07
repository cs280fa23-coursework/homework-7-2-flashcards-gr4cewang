import type { Card } from "@/lib/types";
import CardActions from "@/components/card/card-actions"

const Card = ({ card }: { card: Card }) => {
  const { front, back } = card;

  return (
    <div className="flex border-b border-slate-400">
      <div className="w-full p-4">
        <div className="flex mb-2">
          <CardActions id={card.id} card={card} />
        </div>
        <div className="mt-2">{front}</div>
        <div className="mt-2">{back}</div>
      </div>
    </div>
  );
};

export default Card;
