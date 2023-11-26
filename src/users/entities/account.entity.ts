import { BaseEntity } from '@/common/config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Account' })
export class Account extends BaseEntity {
  
  @Column({ type: 'text' })
  type!: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @Column({ type: 'text' })
  provider!: string;

  @Column({ type: 'text' })
  providerAccountId!: string;

  @Column({ type: 'text', nullable: true })
  refresh_token!: string;

  @Column({ type: 'text', nullable: true })
  access_token!: string;

  @Column({
    nullable: true,
    type: 'int4',
  })
  expires_at!: number;

  @Column({ type: 'text', nullable: true })
  token_type!: string;

  @Column({ type: 'text', nullable: true })
  scope!: string;

  @Column({ type: 'text', nullable: true })
  id_token!: string;

  @Column({ type: 'text', nullable: true })
  session_state!: string;

}