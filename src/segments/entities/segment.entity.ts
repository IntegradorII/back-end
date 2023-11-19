import { BaseEntity } from '@/common/config/base.entity';
import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Segment extends BaseEntity {

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ unique: true })
  requiredPoints: number;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => SegmentBenefit, segmentBenefit => segmentBenefit.id, {
    // eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    })
  benefits: SegmentBenefit[];

  @OneToMany(() => User, user => user.id, {
    // eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  users: User[];

}
