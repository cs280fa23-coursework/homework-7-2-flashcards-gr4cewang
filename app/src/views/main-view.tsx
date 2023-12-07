import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar";
import { User } from "@/lib/types";

const MainView = ({ user }: { user: User | null }) => {
  return (
    <>
      <Sidebar />
      <Feed user = {user} />
      <Aside />
    </>
  );
};

export default MainView;
