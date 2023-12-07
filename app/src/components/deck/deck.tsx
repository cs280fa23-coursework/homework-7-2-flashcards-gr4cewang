import type { Deck as DeckType } from "@/lib/types";
import DeckActions from "./deck-actions";
import { Button } from "../ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { SyntheticEvent } from "react";
import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";

const Deck = ({ deck }: { deck: DeckType }) => {
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

  const showCards = (event: SyntheticEvent) => {
    event.preventDefault();
    if (selectedDeckId === deck.id) {
      clearSelectedDeckId();
    } else {
      setSelectedDeckId(deck.id);
    }
  };
  
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
      <Button variant="ghost" size="sm" onClick={showCards}>
        <OpenInNewWindowIcon className="w-5 h-5" />
        <Link to={`decks/${deck.id}`}>link</Link>
      </Button>
    </div>
  );
};

export default Deck;
