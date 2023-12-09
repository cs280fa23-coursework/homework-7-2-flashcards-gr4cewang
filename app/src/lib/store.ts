import { Deck, DeckWithUserData, User, Card } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: Deck[];
  user: User | null;
  cards: Card[];
  selectedDeckId: string | null;
};

type Action = {
  setDecks: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: DeckWithUserData) => void;
  updateDeck: (id: string, title: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, front: string, back: string) => void;
  clearCards: () => void;
  setSelectedDeckId: (id: string) => void;
  clearSelectedDeckId: () => void;
};

// Define the initial state
const initialState: State = {
  decks: [],
  user: null,
  cards: [],
  selectedDeckId: null,
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

    // Card functionalities below:

    setCards: (cards) => set({ cards }),

    addCard: (card) => {
      set({
        cards: [card, ...get().cards],
        decks: get().decks.map((deck) => {
          if (deck.id === card.deckId) {
            return {
              ...deck,
              numberOfCards: deck.numberOfCards + 1,
            };
          }
          return deck;
        }),
      });
    },

    updateCard: (id, front, back) => {
      const newCards: Card[] = get().cards.map((card) => {
        if (card.id === id) {
          return { ...card, front: front, back: back };
        }
        return card;
      });

      set({ cards: newCards });
    },

    removeCard: (id) => {
      const newCards: Card[] = get().cards.filter((card) => card.id != id);
      set({ cards: newCards });
    },

    clearCards: () => set({ cards: [] }),

    setSelectedDeckId: (id) => set({ selectedDeckId: id }),
    clearSelectedDeckId: () => set({ selectedDeckId: null }),
  })),
);
