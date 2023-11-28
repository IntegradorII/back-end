import { IsDate, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateBenefitDto {

  @IsNumber()
  value: number;

  @IsNumber()
  benefitType: number;

  @IsOptional()
  @IsInt()
  status: number;

  @IsOptional()
  @IsDate()
  expirationDate: Date;

}
