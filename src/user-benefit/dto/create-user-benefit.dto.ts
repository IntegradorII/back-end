import { IsDate, IsEmail, IsInt, IsOptional, Min } from 'class-validator';

export class CreateUserBenefitDto {

  @IsEmail()
  user_email: string;

  @IsInt()
  benefit_id: number;

  @IsInt()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  remaining: number;

  @IsOptional()
  @IsInt()
  estatus: number;

  @IsOptional()
  @IsDate()
  expiration_date: Date;

}
