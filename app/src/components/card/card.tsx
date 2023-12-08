import type { Card } from "@/lib/types";
import CardActions from "@/components/card/card-actions";
import { useEffect, useState } from "react";
import { Card as ShadCnUICard } from "@/components/ui/card";

const Card = ({ card }: { card: Card }) => {
  //const { front, back } = card;
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [frontYes, setFrontYes] = useState(true);

  useEffect(() => {
    // Update the front and back values when the card prop changes
    setFront(card.front);
    setBack(card.back);
  }, [card.front]);

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
          <ShadCnUICard
            className="mt- p-4 whitespace-normal"
            onClick={handleFlip}
          >
            {front}
          </ShadCnUICard>
        ) : (
          <ShadCnUICard
            className="mt-2 bg-blue-900 text-white p-4 whitespace-normal"
            onClick={handleFlip}
          >
            {back}
          </ShadCnUICard>
        )}
      </div>
    </div>
  );
};

export default Card;
