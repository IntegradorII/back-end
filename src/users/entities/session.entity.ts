import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Session' })
export class Session extends BaseEntity {

  @Column({ type: 'text', unique: true })
  sessionToken!: string;

  @Column({ type: 'timestamp' })
  expires!: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User;

}