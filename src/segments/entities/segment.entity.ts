import { BaseEntity } from '@/common/config/base.entity';
import { SegmentBenefit } from '@/segment-benefit/entities/segment-benefit.entity';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Segment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ unique: true })
  required_points: number;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => SegmentBenefit, segmentBenefit => segmentBenefit.id, {
    // eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    })
  benefits: SegmentBenefit[];

  @OneToMany(() => User, user => user.email, {
    // eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  users_email: User[];

}
