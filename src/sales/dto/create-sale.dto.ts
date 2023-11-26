import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateSaleDto {

  @IsEmail()
  userEmail: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  value: number;

  @IsOptional()
  @IsDate()
  date: Date;

  // @IsOptional()
  // updatedPoints: boolean;

}
