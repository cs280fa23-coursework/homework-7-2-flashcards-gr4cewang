import useQueryCards from "@/hooks/use-query-cards";
import Card from "./card";
import { AddCardDialog } from "./add-card-dialog";

const Cards = () => {
  const { cards } = useQueryCards();

  return (
    <div>
      <div className="flex items-center justify-center">
        <AddCardDialog />
      </div>
      <div>
        {cards.length === 0 ? (
          <div className="p-4 text-center border-b border-slate-400">
            No cards yet.
          </div>
        ) : (
          cards.map((card) => (
            <Card card={card} key={card.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Cards;
