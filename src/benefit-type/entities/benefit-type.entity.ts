import { Benefit } from '@/benefits/entities/benefit.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class BenefitType extends BaseEntity {

  @Column({ type: 'int', unique: true })
  type: number;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Benefit, benefit => benefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  // @JoinColumn({ name: 'benefit_id' })
  benefits: Benefit[];

}
