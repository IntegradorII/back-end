import { PartialType } from '@nestjs/mapped-types';
import { CreatePetCharacteristicDto } from './create-pet-characteristic.dto';

export class UpdatePetCharacteristicDto extends PartialType(CreatePetCharacteristicDto) {}
