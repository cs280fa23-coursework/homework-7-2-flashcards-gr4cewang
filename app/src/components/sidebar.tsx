import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { AddDeckDialog } from "./deck/add-deck-dialog";
import { useNavigate } from "react-router-dom";
import { AddCardDialog } from "./card/add-card-dialog";
import { useStore } from "@/lib/store";

const Sidebar = () => {
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/");
    clearSelectedDeckId();
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button variant={"ghost"} size="sm" onClick={handleClickHome}>
        <HomeIcon className="w-5 h-5" />
      </Button>
      <Button variant={"ghost"} size="sm">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>
      {selectedDeckId ? <AddCardDialog /> : <AddDeckDialog />}
    </div>
  );
};

export default Sidebar;
