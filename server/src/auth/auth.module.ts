import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "src/users/users.module";
import { PrismaModule } from "prisma/prisma.module";
import { LocalStrategy } from "./local.strategy";
import { RefreshJwtStrategy } from "./refreshToken.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, RefreshJwtStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "1d" },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
