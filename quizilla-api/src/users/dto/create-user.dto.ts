import { IsEmail, IsStrongPassword, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsStrongPassword()
  readonly password: string;
}
