import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAlliedBrandDto {

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  link: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  image: string;

}
