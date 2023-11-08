import { Transform } from 'class-transformer';
import { IsEmail, IsNumberString, IsString, Length, MinLength } from 'class-validator';

export class SignupDto {

  @IsString()
  @Length(2)
  doc_type: string;

  @IsNumberString()
  @Length(6, 10)
  doc_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(6)
  password: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  last_name: string;
}