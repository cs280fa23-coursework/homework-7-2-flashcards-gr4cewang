import type { Card, Deck, DeckWithUserData, User } from "./types";
import {
  getAuthenticatedUser,
  getAuthenticatedUserToken,
  removeAuthenticatedUserToken,
  storeAuthenticatedUserToken,
} from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch all decks with user data
export const fetchDecks = async (): Promise<Deck[]> => {
  const token = getAuthenticatedUserToken();
  // console.log(token);

  const response = await fetch(`${API_URL}/decks?withUserData=true`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // console.log(response);

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  //console.log(responseJson.data);
  return responseJson.data;
};

// Delete deck by id
export const deleteDeck = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

export const createDeck = async (
  title: string,
  image?: string,
): Promise<DeckWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, image }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

export const editDeck = async (id: string, newTitle: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: newTitle }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

// Login, store the token, and return the user
export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  const { access_token } = responseJson.data;

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
  // You can send a request to the server to perform server-side logout
  // Here we just clear the token
  removeAuthenticatedUserToken();
};

// Register a new user
export const register = async (
  username: string,
  password: string,
  displayName: string,
  avatar?: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, displayName, avatar }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

const handleError = (response: Response, message?: string) => {
  if (response.status === 401) {
    removeAuthenticatedUserToken();
    throw new Error("Your session has expired. Please login again.");
  }

  throw new Error(
    `Error: ${response.status} - ${message || response.statusText}`,
  );
};

export const createCard = async (
  front: string, // what is written of the front of the flashcard
  back: string, // what is written on the back of the flashcard
  deckId: string,
): Promise<Card> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front, back }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

export const editCard = async (
  deckId: string,
  cardId: string,
  newFront: string,
  newBack: string,
): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front: newFront, back: newBack }),
  });
  const responseJson = await response.json();

  //console.log(responseJson);

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

export const deleteCard = async (
  deckId: string,
  cardId: string,
): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }
};

export const fetchCards = async (deckId: string): Promise<Card[]> => {
  const token = getAuthenticatedUserToken();
  // console.log(token);

  const response = await fetch(
    `${API_URL}/decks/${deckId}/cards?withDeckData=true`, // TODO does this work??
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  // console.log(response);

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  //console.log(responseJson.data);
  return responseJson.data;
};

// Fetch a post given its id
export const fetchDeckById = async (id: string): Promise<DeckWithUserData> => {
  const response = await fetch(`${API_URL}/decks/${id}?withUserData=true`);
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};
