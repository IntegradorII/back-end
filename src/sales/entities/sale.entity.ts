import { BaseEntity } from '@/common/config/base.entity';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Sale extends BaseEntity {

  @ManyToOne(() => User, user => user.sales, {
    nullable: false,
  })
  user: User;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ nullable: false, type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;

  @Column({ nullable: false, type: 'boolean', default: false })
  updatedPoints: boolean;

}
