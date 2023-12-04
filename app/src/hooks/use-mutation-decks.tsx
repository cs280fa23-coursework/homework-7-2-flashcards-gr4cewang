import { createDeck, deleteDeck, editDeck } from "../lib/api";
import { useStore } from "../lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationDecks() {
  const { toast } = useToast();
  const removeDeck = useStore((state) => state.removeDeck);
  const addDeck = useStore((state) => state.addDeck);
  const updateDeck = useStore((state) => state.updateDeck);

  const deleteDeckById = async (id: string) => {
    try {
      await deleteDeck(id);
      removeDeck(id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const addNewDeck = async (title: string, image?: string) => {
    try {
      const newDeck = await createDeck(title, image);
      addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please try again later.",
      });
    }
  };

  const mutateDeckById = async (id: string, title: string) => {
    try {
      await editDeck(id, title); // api.ts
      updateDeck(id, title); // store.ts
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please try again later.",
      });
    }
  };

  return { deleteDeckById, addNewDeck, mutateDeckById };
}

export default useMutationDecks;
