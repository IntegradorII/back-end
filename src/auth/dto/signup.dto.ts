import { Transform } from 'class-transformer';
import { IsEmail, IsNumberString, IsOptional, IsString, Length, MinLength } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class SignupDto {

  @IsString()
  @Length(2)
  doc_type: string;

  @IsNumberString()
  @Length(6, 10)
  doc_number: string;

  @IsOptional()
  role?: Role;

  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  first_name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  last_name: string;

  @IsOptional()
  @IsNumberString()
  points: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  image: string;
}