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

export type DeckWithUserData = Deck & { user?: User };
