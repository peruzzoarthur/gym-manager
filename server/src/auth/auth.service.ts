import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { PrismaService } from "src/prisma.service";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(
    user: UserEntity
  ): Promise<{ user: UserEntity; accessToken: string; refreshToken: string }> {
    const payload = { username: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        hashedRt: hashedRefreshToken,
      },
    });

    return {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshToken(refresh: string): Promise<{ accessToken: string }> {
    console.log(refresh);
    const tokenPayload = await this.jwtService.verifyAsync(refresh, {
      secret: process.env.JWT_SECRET_KEY,
    });
    if (!tokenPayload) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: tokenPayload.username,
      },
    });
    if (!user) {
      throw new HttpException("Unauthorized1", HttpStatus.UNAUTHORIZED);
    }
    const dbHashedRt = user.hashedRt;
    const isRtTokenValid = await argon.verify(dbHashedRt, refresh);

    if (isRtTokenValid) {
      const accessToken = this.jwtService.sign({
        username: tokenPayload.username,
        sub: tokenPayload.sub,
        role: tokenPayload.role,
      });

      return {
        accessToken: accessToken,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async logOut(email: string): Promise<boolean> {
    // console.log(email);
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    if (!user.hashedRt) {
      return false;
    } else {
      await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          hashedRt: null,
        },
      });
      return true;
    }
  }

  async getRole(email: string): Promise<string> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    return user.role.toString();
  }
}
