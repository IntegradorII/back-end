import { PartialType } from '@nestjs/mapped-types';
import { CreatePetProfileDto } from './create-pet-profile.dto';

export class UpdatePetProfileDto extends PartialType(CreatePetProfileDto) {}
