import { Deck, DeckWithUserData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: Deck[];
  user: User | null;
};

type Action = {
  setDecks: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: DeckWithUserData) => void;
  updateDeck: (id: string, title: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

// Define the initial state
const initialState: State = {
  decks: [],
  user: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDecks: (decks) => set({ decks }),

    // Removing a deck by filtering:
    removeDeck: (id) => {
      const newDecks: Deck[] = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },

    // Adding a deck:
    addDeck: (deck) => {
      set({ decks: [deck, ...get().decks] });
    },

    // Updating a deck:
    updateDeck: (id, newTitle) => {
      const newDecks: Deck[] = get().decks.map((deck) => {
        // If the deck is found, then update:
        if (deck.id == id) {
          return { ...deck, title: newTitle };
        }
        return deck;
      });

      set({ decks: newDecks });
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),
  })),
);
