import { IsDate, IsEmail, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateUserBenefitDto {

  @IsEmail()
  userEmail: string;

  @IsUUID()
  benefitId: string;

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
  expirationDate: Date;

}
