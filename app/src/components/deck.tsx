import type { Deck as DeckType } from "@/lib/types";
import DeckActions from "./deck-actions";

const Deck = ({ deck }: { deck: DeckType }) => {
  return (
    <div className="p-4 border-b border-slate-400">
      <div className="flex items-center justify-between">
        <div className="pb-4">
          <strong>{deck.title}</strong>
        </div>
        <div className="flex mb-2">
          <DeckActions id={deck.id} deck={deck} />
        </div>
      </div>
      <div className="flex p-4 mb-2">{deck.numberOfCards} cards</div>
    </div>
  );
};

export default Deck;
