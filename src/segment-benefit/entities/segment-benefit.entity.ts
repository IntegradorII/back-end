import { Benefit } from '@/benefits/entities/benefit.entity';
import { Segment } from '@/segments/entities/segment.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SegmentBenefit extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Segment, segment => segment.id, {
    eager: true,
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'segment_id' })
  segment_id: Segment;

  @ManyToOne(() => Benefit, benefit => benefit.id, {
    eager: true,
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'benefit_id' })
  benefit_id: Benefit;

  @Column({ type: 'int', nullable: false })
  amount: number;

}
