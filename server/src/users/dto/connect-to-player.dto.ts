import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum CatType {
  ALL = "ALL",
  F = "F",
  M = "M",
}

enum Position {
  REVES = "REVES",
  DRIVE = "DRIVE",
}

export class ConnectToPlayerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: "select a category" })
  categoryId: string;

  @IsEnum(Position)
  position: Position;
}
