import { useToast } from "@/components/ui/use-toast";
import { fetchCards } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Deck } from "@/lib/types";
import { useEffect, useState } from "react";

function useQueryCards() {
  const { toast } = useToast();
  const cards = useStore((state) => state.cards);
  const setCards = useStore((state) => state.setCards);
  const clearCards = useStore((state) => state.clearCards);
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const [deck, setDeck] = useState<Deck | null>(null);

  const loadCards = async () => {
    try {
      const fetchedCards = await fetchCards(selectedDeckId as string);
      console.log(fetchedCards);
      setCards(fetchedCards);
      // setSelectedDeckId(selectedDeckId);
    } catch (error) {
      clearCards();
      clearSelectedDeckId();
      toast({
        variant: "destructive",
        title: "Failed to fetch cards",
        description:
          (error as Error).message ||
          "There was an error loading the cards. Please try again later.",
      });
    }
  };

    // const loadDeck = async (id: string) => {
    //   let cards = null;
    //   try {
    //     cards = await fetchCards(id);
    //     setDeck(deck);
    //     setSelectedDeckId(deck.id);
    //   } catch (error) {
    //     setDeck(null);
    //     clearSelectedDeckId();
    //     toast({
    //       variant: "destructive",
    //       title: "Failed to fetch deck",
    //       description:
    //         (error as Error).message ||
    //         "There was an error loading the deck. Please try again later.",
    //     });
    //   }
    // };

    useEffect(() => {
    if (selectedDeckId) {
      loadCards();
    } else {
      clearCards();
      clearSelectedDeckId();
    }
  }, [selectedDeckId]);

  //console.log(selectedDeckId);

  return { 
    cards
  };
}

export default useQueryCards;
