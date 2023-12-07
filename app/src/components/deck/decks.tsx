import useQueryDecks from "@/hooks/use-query-decks";
import Deck from "./deck";
// import { useStore } from "@/lib/store";
// import Cards from "../card/cards"

const Decks = () => {
  const { decks } = useQueryDecks();
  //const selectedDeckId = useStore((state) => state.selectedDeckId);
  
  return (
    <div className="">
      {decks.map((deck) => (
        <div key={deck.id}>
          <Deck deck={deck}  />
          {/* {deck.id === selectedDeckId && <Cards />} */}
        </div>
      ))}
    </div>
  );
};

export default Decks;