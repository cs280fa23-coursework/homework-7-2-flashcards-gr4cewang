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
import { Textarea } from "./ui/textarea";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationDecks from "../hooks/use-mutation-decks";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";

export const AddDeckDialog = () => {
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const { addNewDeck } = useMutationDecks();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    // Call toast if there is an empty input:
    if (!title) {
      toast({
        variant: "destructive",
        title: "Sorry! Content cannot be empty! 🙁",
        description: `Please enter the content for your deck.`,
      });
      return;
    }
    await addNewDeck(title);
    setTitle("");
  };

  const handleCancel = (): void => {
    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Add Deck"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Deck</DialogTitle>
          <DialogDescription>
            {user
              ? "Give a title to your deck here."
              : "Please log in to create a deck/card."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="title"
                value={title}
                className="col-span-4"
                onChange={(e) => {
                  setTitle(e.target.value);
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
