import { BenefitType } from '@/benefit-type/entities/benefit-type.entity';
import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserBenefit } from '@/user-benefit/entities/user-benefit.entity';

@Entity()
export class Benefit extends BaseEntity {
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ default: 1 })
  estatus: number;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;
  
  @ManyToOne(() => BenefitType, benefitType => benefitType.id, {
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  benefitType: BenefitType;

  @OneToMany(() => SegmentBenefit, segmentBenefit => segmentBenefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  segments: SegmentBenefit[];

  @OneToMany(() => UserBenefit, userBenefit => userBenefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  users: UserBenefit[];

}
