import { PartialType } from '@nestjs/mapped-types';
import { CreateKidProfileDto } from './create-kid-profile.dto';

export class UpdateKidProfileDto extends PartialType(CreateKidProfileDto) {}
