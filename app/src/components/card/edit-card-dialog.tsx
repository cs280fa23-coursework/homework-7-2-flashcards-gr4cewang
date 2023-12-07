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
import useMutationCards from "@/hooks/use-mutation-cards";
import { useToast } from "../ui/use-toast.ts";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Card } from "../../lib/types.ts";

const EditCardDialog = ({
  setDialogOpen,
  card,
}: {
  id: string;
  setDialogOpen: (b: boolean) => void;
  card: Card;
  children: ReactNode;
}) => {
  const [newFront, setFront] = useState("");
  const [newBack, setBack] = useState("");
  const [cardId, setId] = useState("");
  const { toast } = useToast();
  const { mutateCardById } = useMutationCards();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (card !== null && card.deckId !== cardId && card.front !== newFront && card.back !== newBack) {
      setFront(card.front);
      setBack(card.back);
      setId(card.id);
    }
  }, [card]);

  const handleSave = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // Call toast if there is an empty input:
    if (!newFront || !newBack) {
      toast({
        variant: "destructive",
        title: "Sorry! A card must have 'front' and 'back'! 🙁",
        description: `Please provide the required information to update a card.`,
      });
      // Close (possibility 1):

      setMenuOpen(false);
      setDialogOpen(false);
      setFront("");
      setBack("");
      return;
    } else {
        await mutateCardById(cardId, newFront, newBack);

        // Close (possibility 2):
        setMenuOpen(false);
        setDialogOpen(false);
        setFront("");
        setBack("");
    }
  };

  const handleCancel = (): void => {
    // Close (possibility 3):
    setMenuOpen(false);
    setDialogOpen(false);
    setFront("");
    setBack("");
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
          <DialogTitle>Edit Card</DialogTitle>
          <DialogDescription>
            Edit the front and back of your card here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="front" className="text-right">
              Front
            </Label>
            <Input
              // Set the input accordingly:
              id="front"
              value={newFront}
              className="col-span-3"
              onChange={(e) => {
                e.preventDefault();
                setFront(e.target.value);
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="back" className="text-right">
              Back
            </Label>
            <Input
              // Set the input accordingly:
              id="back"
              value={newBack}
              className="col-span-3"
              onChange={(e) => {
                e.preventDefault();
                setBack(e.target.value);
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
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCardDialog;
