import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { PasswordService } from '@/password/password.service';

@Module({
  providers: [UsersService, PrismaService, PasswordService],
  exports: [PrismaService, PasswordService],
})
export class UsersModule {}
