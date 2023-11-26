import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBenefitDto } from './create-user-benefit.dto';

export class UpdateUserBenefitDto extends PartialType(CreateUserBenefitDto) {}
