import { Benefit } from '@/benefits/entities/benefit.entity';
import { Segment } from '@/segments/entities/segment.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class SegmentBenefit extends BaseEntity {

  @ManyToOne(() => Segment, segment => segment.id, {
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  // @JoinColumn({ name: 'segment_id' })
  segment: Segment;

  @ManyToOne(() => Benefit, benefit => benefit.id, {
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  // @JoinColumn({ name: 'benefit_id' })
  benefit: Benefit;

  @Column({ type: 'int', nullable: false })
  amount: number;

}
