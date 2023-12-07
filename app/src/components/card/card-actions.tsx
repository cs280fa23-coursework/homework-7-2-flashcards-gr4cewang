import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { DotsVerticalIcon } from "@radix-ui/react-icons";
  import useMutationCards from "@/hooks/use-mutation-cards.tsx";
  import EditCardDialog from "./edit-card-dialog.tsx";
  import { useState } from "react";
  import { Card } from "../../lib/types.ts";
  
  const CardActions = ({ id, card }: { id: string; card: Card }) => {
    const { deleteCardById } = useMutationCards();
  
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
          <EditCardDialog id={id} setDialogOpen={setDialogBoxOpen} card={card}>
            Edit
          </EditCardDialog>
          {/* <EditDeckDialog id={id} setDialogOpen={setDialogBoxOpen} deck={deck}/> */}
  
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => deleteCardById(id, card.deckId)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default CardActions;
  