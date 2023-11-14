import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Segment {

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

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

}
