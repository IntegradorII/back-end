import { IsString, Length, MinLength } from 'class-validator';

export class CreateAlliedBrandDto {

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @MinLength(1)
  link: string;

  @IsString()
  @MinLength(1)
  image: string;

}
