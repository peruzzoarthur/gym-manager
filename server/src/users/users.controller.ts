import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Request,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { UserEntity } from "./entities/user.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtPayload } from "src/auth/types/auth.types";
import { ActivateTrainingDto } from "./dto/activate-training";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user) => new UserEntity(user));
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getProfile(@Request() req: JwtPayload) {
    return new UserEntity(
      await this.usersService.findOneByEmail(req.user.username)
    );
  }

  @Get("active-training")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async getActiveTraining(@Request() req: JwtPayload) {
    return await this.usersService.isUserTraining(req.user.username);
  }

  @Get("all-active-trainings")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Roles(["ADMIN"])
  @ApiBearerAuth()
  async getAllActiveTrainings() {
    return await this.usersService.getAllUsersTrainings();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param("id") id: string) {
    return new UserEntity(await this.usersService.findOneById(id));
  }

  @Patch("update-password/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async updatePassword(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return new UserEntity(
      await this.usersService.updatePassword(id, updateUserDto)
    );
  }

  @Patch("activate-training/:id")
  @ApiCreatedResponse({ type: UserEntity })
  async activateTraining(
    @Param("id") id: string,
    @Body() activateTrainingDto: ActivateTrainingDto
  ) {
    return new UserEntity(
      await this.usersService.activateTraining(
        activateTrainingDto.trainingId,
        id
      )
    );
  }

  @Patch("deactivate-training/:id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Roles(["USER", "ADMIN"])
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async deactivateTraining(
    @Param("id") id: string,
    @Body() activateTrainingDto: ActivateTrainingDto
  ) {
    return new UserEntity(
      await this.usersService.deactivateTraining(
        activateTrainingDto.trainingId,
        id
      )
    );
  }

  @Patch("profile-image")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async updateProfileImage(
    @Request() req: JwtPayload,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "jpeg",
        })
        .addMaxSizeValidator({ maxSize: 1000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    )
    profileImage: Express.Multer.File
  ) {
    return new UserEntity(
      await this.usersService.updateProfileImage(req.user.id, profileImage)
    );
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param("id", ParseIntPipe) id: string) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
