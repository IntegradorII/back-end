import { BottomSize } from '@/common/enum/botton-size.enum';
import { DocType } from '@/common/enum/doc-type.enum';
import { Gender } from '@/common/enum/gender.enum';
import { Relationship } from '@/common/enum/relationship.enum';
import { TopSize } from '@/common/enum/top-size.enum';
import { IsDate, IsEmail, IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateKidProfileDto {

  @IsEnum(DocType)
  docType: DocType;

  @IsNumberString()
  docNumber: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  image: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  birthDate: Date;

  @IsEnum(TopSize)
  topSize: TopSize;

  @IsEnum(BottomSize)
  bottomSize: BottomSize;

  @IsNumber()
  shoesSize: number;

  @IsEnum(Relationship)
  relationship: Relationship;


}
