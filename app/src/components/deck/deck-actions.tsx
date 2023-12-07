import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks.tsx";
import EditDeckDialog from "./edit-deck-dialog";
import { useState } from "react";
import { Deck } from "../../lib/types.ts";

const DeckActions = ({ id, deck }: { id: string; deck: Deck }) => {
  const { deleteDeckById } = useMutationDecks();

  const [open, setDialogBoxOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setDialogBoxOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDialogBoxOpen(true)}
        >
          <DotsVerticalIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <EditDeckDialog id={id} setDialogOpen={setDialogBoxOpen} deck={deck}>
          Edit
        </EditDeckDialog>
        {/* <EditDeckDialog id={id} setDialogOpen={setDialogBoxOpen} deck={deck}/> */}

        <DropdownMenuItem
          className="text-red-500"
          onClick={() => deleteDeckById(id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeckActions;
