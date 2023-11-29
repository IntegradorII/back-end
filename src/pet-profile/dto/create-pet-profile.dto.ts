import { PetGender } from '@/common/enum/pet-gender.enum';
import { PetKind } from '@/common/enum/pet-kind.enum';
// import { Relationship } from '@/common/enum/relationship.enum';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePetProfileDto {

  @IsEmail()
  userEmail: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  name: string;

  @IsEnum(PetKind)
  kind: PetKind;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  breed: string;

  @IsEnum(PetGender)
  gender: PetGender;

  @IsNumber()
  @Min(1)
  size: number;

  @IsDate()
  birthDate: Date;

  // @IsEnum(Relationship)
  // relationship: Relationship;
}
