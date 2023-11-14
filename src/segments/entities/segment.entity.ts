import { BaseEntity } from '@/common/config/base.entity';
import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Segment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column()
  required_points: number;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => SegmentBenefit, segmentBenefit => segmentBenefit.id, {
    // eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    })
  benefits: SegmentBenefit[];

}
