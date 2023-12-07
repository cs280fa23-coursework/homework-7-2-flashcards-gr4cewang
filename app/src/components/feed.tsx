import Header from "./header";
import Decks from "./deck/decks";
import { User } from "@/lib/types";

const Feed = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-col w-full min-h-screen border-x border-slate-400 md:max-w-xl">
      <Header />
      <div>
        {user && <Decks />}
        <div className="flex justify-center">
          {!user && (
            <div className="flex p-9">
              Please login to view your cards or register to use this app.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
