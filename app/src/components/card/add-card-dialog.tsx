import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useMutationCards from "@/hooks/use-mutation-cards";

export const AddCardDialog = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { addNewCard } = useMutationCards();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    // Call toast if there's an empty input:
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! A card must have 'front' and 'back'! 🙁",
        description: `Please provide the required information to add a card.`,
      });
      setFront("");
      setBack("");
      return;
    }
    await addNewCard(front, back);
    setFront("");
    setBack("");
  };

  const handleCancel = () => {
    setFront("");
    setBack("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label={"Make a Card"}
          variant="secondary"
          size="sm"
          className="w-full m-2"
        >
          Add Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the content of your card here."
              : "Please login to make a deck."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="front"
                value={front}
                className="col-span-4"
                onChange={(e) => {
                  setFront(e.target.value);
                }}
              />
              <Textarea
                id="back"
                value={back}
                className="col-span-4"
                onChange={(e) => {
                  setBack(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
