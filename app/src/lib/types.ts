export type User = {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
};

export type Deck = {
  id: string;
  title: string;
  image?: string;
  numberOfCards: number;
};

export type Card = {
  id: string;
  front: string;  // what is written of the front of the flashcard
  back: string;   // what is written on the back of the flashcard
  deckId: string;
}

export type DeckWithUserData = Deck & { user?: User };
//export type CardWithDeckData = Card & { deck?: Deck };
