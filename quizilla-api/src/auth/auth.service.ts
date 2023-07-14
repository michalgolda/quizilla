import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { PasswordService } from '@/password/password.service';
import { BadCredentialsException } from './exceptions/bad-credentials.exception';
import { AlreadyUsedException } from '@/exceptions/already-used.exception';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new BadCredentialsException();

    const matchPassword = await this.passwordService.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!matchPassword) throw new BadCredentialsException();

    const tokenPayload = {
      sub: user.id,
    };
    const token = await this.jwtService.signAsync(tokenPayload);

    return { token };
  }

  async register(createUserDto: CreateUserDto) {
    const userByEmail = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (userByEmail) throw new AlreadyUsedException('Email');

    const userByUsername = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (userByUsername) throw new AlreadyUsedException('Username');

    return this.usersService.create(createUserDto);
  }
}
