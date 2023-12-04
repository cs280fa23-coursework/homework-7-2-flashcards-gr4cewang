import { DeckResponseDto } from "./deck-response.dto";

export class FindDecksResponseDTO {
  limit: number;
  offset: number;
  search?: string;
  withUserData?: boolean;
  data: DeckResponseDto[];
}
