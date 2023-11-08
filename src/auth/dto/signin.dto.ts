import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  password: string;
}