import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(
    email: string,
    password: string
  ): Promise<Partial<UserEntity>> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new NotFoundException();
    }

    const { password: pw, hashedRt, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
