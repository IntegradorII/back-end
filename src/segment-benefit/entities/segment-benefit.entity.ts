import { Benefit } from '@/benefits/entities/benefit.entity';
import { Segment } from '@/segments/entities/segment.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class SegmentBenefit extends BaseEntity {

  @ManyToOne(() => Segment, segment => segment.benefits, {
    nullable: false,
  })
  // @JoinColumn({ name: 'segment_id' })
  segment: Segment;

  @ManyToOne(() => Benefit, benefit => benefit.segments, {
    nullable: false,
  })
  // @JoinColumn({ name: 'benefit_id' })
  benefit: Benefit;

  @Column({ type: 'int', nullable: false, default: 1 })
  amount: number;

}
