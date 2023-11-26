import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateSegmentBenefitDto {

  @IsUUID()
  segmentId: string;

  @IsUUID()
  benefitId: string;

  @IsInt()
  @Min(0)
  amount: number;

}
