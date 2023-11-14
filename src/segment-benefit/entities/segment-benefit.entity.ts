import { Benefit } from '@/benefits/entities/benefit.entity';
import { Segment } from '@/segments/entities/segment.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SegmentBenefit {

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

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

}
