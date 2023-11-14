import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateBenefitTypeDto {

  @IsNumber()
  @Min(10000)
  @Max(99999)
  type: number;

  @IsString()
  description: string;

}
