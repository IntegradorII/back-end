import { BaseEntity } from '@/common/config/base.entity';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PetKind } from '@/common/enum/pet-kind.enum';
import { PetGender } from '@/common/enum/pet-gender.enum';
import { Relationship } from '@/common/enum/relationship.enum';
import { PetCharacteristic } from '@/pet-characteristic/entities/pet-characteristic.entity';

@Entity()
export class PetProfile extends BaseEntity {

  @ManyToOne(() => User, user => user.petProfiles, {
    nullable: false,
  })
  user: User;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: false, type: 'enum', enum: PetKind })
  kind: PetKind;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  breed: string;

  @Column({ nullable: false, type: 'enum', enum: PetGender })
  gender: PetGender;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: false, type: 'date' })
  birthDate: Date;

  @Column({ nullable: true, type: 'enum', enum: Relationship })
  relationship: Relationship;

  @OneToMany(() => PetCharacteristic, petCharacteristic => petCharacteristic.petProfile)
  petCharacteristics: PetCharacteristic[];

}
