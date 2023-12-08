import { IsOptional, IsString } from "class-validator";

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  front: string;

  @IsString()
  @IsOptional()
  back: string;
}
