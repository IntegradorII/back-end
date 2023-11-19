import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateSegmentDto {

  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(1, 50)
  name: string;

  @IsInt()
  @Min(0)
  requiredPoints: number;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  description: string;

}
