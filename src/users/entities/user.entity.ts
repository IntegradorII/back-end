import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '@/common/enum/role.enum';
import { BaseEntity } from '@/common/config/base.entity';
import { UserBenefit } from '@/user-benefit/entities/user-benefit.entity';
import { Segment } from '@/segments/entities/segment.entity';
import { IdType } from '@/common/enum/id-type.enum';

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'enum', enum: IdType })
  docType: string;

  @Column()
  docNumber: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  // @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  @Column({ default: 0 })
  points: number;

  @Column({ type: 'text', nullable: true })
  image: string;

  @OneToMany(() => UserBenefit, userBenefit => userBenefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  benefits: UserBenefit[];

  @ManyToOne(() => Segment, segment => segment.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  segment: Segment;

}
