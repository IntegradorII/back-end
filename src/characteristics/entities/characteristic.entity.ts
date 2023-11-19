import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Characteristic extends BaseEntity {

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

}
