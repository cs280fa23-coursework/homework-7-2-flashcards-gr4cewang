import { CardResponseDto } from "./card-response.dto";

export class FindCardsResponseDTO {
  limit: number;
  offset: number;
  search?: string;
  withUserData?: boolean;
  data: CardResponseDto[];
}
