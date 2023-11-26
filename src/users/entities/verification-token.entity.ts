import { BaseEntity } from '@/common/config/base.entity';
import { transformer } from '@/common/util/trasformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'VerificationToken' })
export class VerificationToken extends BaseEntity {
  
  @Column()
  token!: string;

  @Column()
  identifier!: string;

  @Column({ transformer: transformer.date })
  expires!: string;

}