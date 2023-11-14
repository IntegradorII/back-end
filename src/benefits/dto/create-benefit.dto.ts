import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateBenefitDto {

  @IsNumber()
  value: number;

  @IsNumber()
  benefit_type: number;

  @IsOptional()
  @IsInt()
  status: number;

}
