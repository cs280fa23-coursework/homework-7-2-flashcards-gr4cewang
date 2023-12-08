import type { Deck as DeckType } from "@/lib/types";
import DeckActions from "./deck-actions";
import { Button } from "../ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Deck = ({ deck }: { deck: DeckType }) => {
  return (
    <div className="p-4 border border-slate-400 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="pb-4">
          <strong>{deck.title}</strong>
        </div>
        <div className="flex mb-2">
          <DeckActions id={deck.id} deck={deck} />
        </div>
      </div>
      <div className="flex p-4 mb-2">{deck.numberOfCards} cards</div>
      <Button variant="ghost" size="sm">
        <Link to={`decks/${deck.id}`}>
          <div className="flex items-center">
            <OpenInNewWindowIcon className="w-4 h-4" />
            <span className="ml-1">See cards</span>
          </div>
        </Link>
      </Button>
    </div>
  );
};

export default Deck;
