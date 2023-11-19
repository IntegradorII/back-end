import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCharacteristicDto {

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(1, 50)
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  description: string;

}
