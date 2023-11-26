import { BenefitType } from '@/benefit-type/entities/benefit-type.entity';
import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserBenefit } from '@/user-benefit/entities/user-benefit.entity';

@Entity()
export class Benefit extends BaseEntity {
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ default: 1 })
  estatus: number;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;
  
  @ManyToOne(() => BenefitType, benefitType => benefitType.benefits, {
    nullable: false,
  })
  benefitType: BenefitType;

  @OneToMany(() => SegmentBenefit, segmentBenefit => segmentBenefit.benefit)
  segments: SegmentBenefit[];

  @OneToMany(() => UserBenefit, userBenefit => userBenefit.benefit)
  users: UserBenefit[];

}
