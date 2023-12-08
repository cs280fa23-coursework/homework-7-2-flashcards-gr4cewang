import MainView from "./views/main-view";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import { useEffect } from "react";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { useToast } from "./components/ui/use-toast";
import ErrorPage from "./routes/error-page";
import CardView from "./views/card-view";

function App() {
  const user = useStore((state) => state.user);
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView user={user} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/decks/:deckId",
      element: <CardView />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
