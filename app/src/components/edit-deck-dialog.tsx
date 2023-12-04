import { ReactNode, useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { useToast } from "./ui/use-toast";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Deck } from "../lib/types.ts";

const EditDeckDialog = ({
  id,
  setDialogOpen,
  deck,
}: {
  id: string;
  setDialogOpen: (b: boolean) => void;
  deck: Deck;
  children: ReactNode;
}) => {
  const [newTitle, setTitle] = useState("");
  const [deckId, setId] = useState("");
  const { toast } = useToast();
  const { mutateDeckById } = useMutationDecks();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (deck !== null && deck.id !== deckId && deck.title !== newTitle) {
      setTitle(deck.title);
      setId(deck.id);
    }
  }, [deck]);

  const handleSave: () => Promise<void> = async () => {
    // Call toast if there is an empty input:
    if (!newTitle) {
      toast({
        variant: "destructive",
        title: "Sorry! Content cannot be empty! 🙁",
        description: `Please enter the content for your deck.`,
      });
      // Close (possibility 1):

      setMenuOpen(false);
      setDialogOpen(false);
      return;
    }
    await mutateDeckById(id, newTitle);

    // Close (possibility 2):
    setMenuOpen(false);
    setDialogOpen(false);
    setTitle("");
  };

  const handleCancel = (): void => {
    // Close (possibility 3):
    setMenuOpen(false);
    setDialogOpen(false);
    setTitle("");
  };

  return (
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          // Open the dialog:
          onSelect={(event) => {
            event.preventDefault();
            // Open:
            setMenuOpen(true);
            setDialogOpen(true);
          }}
        >
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>
            Edit the title of your deck here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              // Set the input accordingly:
              id="content"
              value={newTitle}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={(event) => {
                event.preventDefault(); // prevent under the hood default behaviors that HTML has
                handleSave();
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDeckDialog;
