import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlliedBrand extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'text' })
  link: string;

  @Column({ type: 'text' })
  image: string;

}
