import { IsInt, Min } from 'class-validator';

export class CreateSegmentBenefitDto {

  @IsInt()
  segment_id: number;

  @IsInt()
  benefit_id: number;

  @IsInt()
  @Min(0)
  amount: number;

}
