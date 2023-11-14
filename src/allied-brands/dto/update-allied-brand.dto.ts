import { PartialType } from '@nestjs/mapped-types';
import { CreateAlliedBrandDto } from './create-allied-brand.dto';

export class UpdateAlliedBrandDto extends PartialType(CreateAlliedBrandDto) {}
