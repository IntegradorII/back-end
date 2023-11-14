import { Benefit } from '@/benefits/entities/benefit.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BenefitType extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  type: number;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Benefit, benefit => benefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  benefits: Benefit[];

}
