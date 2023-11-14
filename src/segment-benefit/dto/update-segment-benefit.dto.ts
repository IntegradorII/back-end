import { PartialType } from '@nestjs/mapped-types';
import { CreateSegmentBenefitDto } from './create-segment-benefit.dto';

export class UpdateSegmentBenefitDto extends PartialType(CreateSegmentBenefitDto) {}
