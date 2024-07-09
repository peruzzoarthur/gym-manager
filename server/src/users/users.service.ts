import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";
import * as argon from "argon2";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await argon.hash(createUserDto.password);

    createUserDto.password = hashedPassword;

    const dob = new Date(createUserDto.dob);

    return await this.prisma.user.create({
      data: { ...createUserDto, dob: dob },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async findOneById(id: string) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async updatePassword(id: string, updateUserDto: UpdateUserDto) {
    // if (updateUserDto.password) {
    //   updateUserDto.password = await argon.hash(updateUserDto.password);
    // }
    return await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async updateProfileImage(id: string, profileImage: Express.Multer.File) {
    const bufferData = profileImage.buffer;
    const base64String = Buffer.from(bufferData).toString("base64");
    const image = `data:image/jpeg;base64,${base64String}`;
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        profileImage: image,
      },
    });
  }

  async setAdmin(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException("No user", HttpStatus.NOT_FOUND);
    }
    if (user.role === "ADMIN") {
      throw new HttpException("Already admin", HttpStatus.CONFLICT);
    }
    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: "ADMIN",
      },
    });
  }

  async activateTraining(trainingId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (user.activeTrainingId) {
      throw new HttpException(
        "Finish active training before activating a new one",
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        activeTrainingId: trainingId,
      },
    });
  }

  async deactivateTraining(trainingId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (!user.activeTrainingId) {
      throw new HttpException(
        "No training active for user",
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        activeTrainingId: null,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
