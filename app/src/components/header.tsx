import { useStore } from "@/lib/store";
import { Button } from "./ui/button";

const Header = () => {
  const selectedDeckId = useStore((state) => state.selectedDeckId);

  return (
    <div className="flex justify-center gap-3 p-4 border-b border-slate-400">
      <Button variant={"link"} disabled={selectedDeckId != null}>
        Decks
      </Button>
      <Button variant={"link"} disabled={!selectedDeckId}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
