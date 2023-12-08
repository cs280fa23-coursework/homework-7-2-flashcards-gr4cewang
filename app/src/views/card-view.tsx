import Aside from "@/components/aside";
import Cards from "@/components/card/cards";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CardView = () => {
  const { deckId } = useParams();
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);

  useEffect(() => {
    if (deckId) {
      setSelectedDeckId(deckId);
    }
  }, [deckId]);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen border-x border-slate-400 md:max-w-xl">
        <Header />
        <div>
          <div className="flex flex-col w-full min-h-screen border-x border-slate-400 md:max-w-xl">
            {selectedDeckId && <Cards />}
          </div>
        </div>
      </div>
      <Aside />
    </>
  );
};

export default CardView;
