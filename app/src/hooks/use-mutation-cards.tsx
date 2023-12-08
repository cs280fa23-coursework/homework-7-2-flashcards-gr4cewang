import { createCard, deleteCard, editCard } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationCards() {
  const { toast } = useToast();
  const removeCard = useStore((state) => state.removeCard);
  const addCard = useStore((state) => state.addCard);
  const updateCard = useStore((state) => state.updateCard);
  const selectedDeckId = useStore((state) => state.selectedDeckId);

  const deleteCardById = async (cardId: string, deckId: string) => {
    try {
      await deleteCard(deckId, cardId);
      removeCard(cardId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the card",
        description:
          (error as Error).message ||
          "There was an error deleting the card. Please try again later.",
      });
    }
  };

  const addNewCard = async (front: string, back: string) => {
    try {
      const newCard = await createCard(front, back, selectedDeckId as string);
      addCard(newCard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the card",
        description:
          (error as Error).message ||
          "There was an error creating the card. Please try again later.",
      });
    }
  };

  const mutateCardById = async (
    cardId: string,
    front: string,
    back: string,
  ) => {
    try {
      await editCard(selectedDeckId as string, cardId, front, back); // api.ts
      updateCard(cardId, front, back); // store.ts
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the card",
        description:
          (error as Error).message ||
          "There was an error creating the card. Please try again later.",
      });
    }
  };

  return { deleteCardById, addNewCard, mutateCardById };
}
export default useMutationCards;
