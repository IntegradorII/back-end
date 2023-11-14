import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MinLength } from 'class-validator';
import { Role } from '@/common/enum/role.enum';

export class SignupDto {

  @IsString()
  @Length(2)
  doc_type: string;

  @IsNumberString()
  @Length(6, 10)
  doc_number: string;

  @IsOptional()
  @IsEnum(Role)
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
  @IsNotEmpty()
  first_name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  last_name?: string;

  @IsOptional()
  // @IsNumber({ maxDecimalPlaces: 0 })
  @IsInt()
  points?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  image?: string;
  
}