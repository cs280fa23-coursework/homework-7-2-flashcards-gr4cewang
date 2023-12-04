import { UserResponseDTO } from "src/user/user-response.dto";

export class DeckResponseDto {
  // This DTO will be used when we want to send back deck data in the response.
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: number;
  image?: string;
  numberOfCards: number;
  user?: UserResponseDTO;
}
