import type { Card } from "@/lib/types";
import CardActions from "@/components/card/card-actions"
import { useState } from "react";

const Card = ({ card }: { card: Card }) => {

  const { front, back } = card;

  const [frontYes, setFrontYes] = useState(true);

  const handleFlip = () => {
    setFrontYes((prevFrontYes) => !prevFrontYes);
  };

  return (
    <div className="p-4 border-b border-slate-400">
      <div className="w-full p-4">
        <div className="flex mb-2 justify-end">
          <CardActions id={card.id} card={card} />
        </div>
        {frontYes ? (
          <div className="mt-2 bg-white text-black p-4 rounded border-2" onClick={handleFlip}>
            {front}
          </div>
        ) : (
          <div className="mt-2 bg-blue-900 text-white p-4 rounded" onClick={handleFlip}>
            {back}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
