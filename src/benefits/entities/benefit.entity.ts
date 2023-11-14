import { BenefitType } from '@/benefit-type/entities/benefit-type.entity';
import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Benefit extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ default: 1 })
  estatus: number;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;
  
  @ManyToOne(() => BenefitType, benefitType => benefitType.id, {
    eager: true,
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  benefit_type: BenefitType;

  @OneToMany(() => SegmentBenefit, segmentBenefit => segmentBenefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  segments: SegmentBenefit[];

}
