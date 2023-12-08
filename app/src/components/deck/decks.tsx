import useQueryDecks from "@/hooks/use-query-decks";
import Deck from "./deck";

const Decks = () => {
  const { decks } = useQueryDecks();

  return (
    <div className="">
      {decks.map((deck) => (
        <div key={deck.id} className="mb-4">
          <Deck deck={deck} />
        </div>
      ))}
    </div>
  );
};

export default Decks;
