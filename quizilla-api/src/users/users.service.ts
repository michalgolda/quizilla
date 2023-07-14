import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '@/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  findById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await this.passwordService.hash(
      createUserDto.password,
    );
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        passwordHash,
      },
    });
  }
}
