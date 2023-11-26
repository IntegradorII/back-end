import { BaseEntity } from '@/common/config/base.entity';
import { PetCharacteristic } from '@/pet-characteristic/entities/pet-characteristic.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Characteristic extends BaseEntity {

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => PetCharacteristic, petCharacteristic => petCharacteristic.characteristic)
  petCharacteristics: PetCharacteristic[];
  
}
