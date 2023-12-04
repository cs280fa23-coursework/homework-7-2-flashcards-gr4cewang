import useQueryDeck from "@/hooks/use-query-decks";
import Deck from "./deck";

const Decks = () => {
  const { decks } = useQueryDeck();
  return (
    <div className="">
      {decks.map((deck) => (
        <Deck deck={deck} key={deck.id} />
      ))}
    </div>
  );
};

export default Decks;
