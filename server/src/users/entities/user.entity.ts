import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements Partial<User> {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @Exclude()
  role: Role;

  @Exclude()
  password: string;

  @Exclude()
  hashedRt?: string;

  @Exclude()
  profileImage?: string;
}
