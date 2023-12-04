import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty({ message: "Front cannot be empty" })
  front: string;

  @IsString()
  @IsNotEmpty({ message: "Front cannot be empty" })
  back: string;
}
