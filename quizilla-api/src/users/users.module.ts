import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { PasswordService } from '@/password/password.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService, PasswordService],
  exports: [UsersService, PrismaService, PasswordService],
  controllers: [UsersController],
})
export class UsersModule {}
