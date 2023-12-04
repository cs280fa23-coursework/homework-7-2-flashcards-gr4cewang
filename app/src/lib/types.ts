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
  front: string;  // what is written of the front of the flashcard
  back: string;   // what is written on the back of the flashcard
}

export type DeckWithUserData = Deck & { user?: User };
