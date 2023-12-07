import type { Card } from "@/lib/types";
import CardActions from "@/components/card/card-actions"

const Card = ({ card }: { card: Card }) => {
  const { front, back } = card;

  let frontYes: boolean = true;
  
  const handleFlip = async () => {
    if (frontYes) {
      frontYes = false;
    } else {
      frontYes = true;
    }
  };

  return (
    <div className="p-4 border-b border-slate-400">
      <div className="w-full p-4">
        <div className="flex mb-2 justify-end">
          <CardActions id={card.id} card={card} />
        </div>
        {frontYes ? <div className="mt-2" onClick = {handleFlip}>{front}</div> : <div className="mt-2" onClick = {handleFlip}>{back}</div>}
        {/* <div className="mt-2">{front}</div>
        <div className="mt-2">{back}</div> */}
      </div>
    </div>
  );
};

export default Card;
