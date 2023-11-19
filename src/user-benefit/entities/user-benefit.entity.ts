import { Benefit } from '@/benefits/entities/benefit.entity';
import { BaseEntity } from '@/common/config/base.entity';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('user_benefit')
export class UserBenefit extends BaseEntity {

  @ManyToOne(() => User, use => use.id, {
    eager: true,
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  // @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
  user: User;

  @ManyToOne(() => Benefit, benefit => benefit.id, {
    eager: true,
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  benefit: Benefit;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @Column({ type: 'int', nullable: false })
  remaining: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  estatus: number;
  
  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

}
