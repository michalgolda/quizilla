import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
