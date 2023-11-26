import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePetCharacteristicDto {

  @IsUUID()
  petProfileId: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  characteristicName: string;

}
