import { Characteristic } from '@/characteristics/entities/characteristic.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { PetProfile } from '@/pet-profile/entities/pet-profile.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class PetCharacteristic extends BaseEntity {

  @ManyToOne(() => PetProfile, petProfile => petProfile.petCharacteristics, {
    nullable: false,
  })
  petProfile: PetProfile;

  @ManyToOne(() => Characteristic, characteristic => characteristic.petCharacteristics, {
    nullable: false,
  })
  characteristic: Characteristic;

}
