import { BenefitType } from '@/benefit-type/entities/benefit-type.entity';
import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Benefit {
  
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

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

}
