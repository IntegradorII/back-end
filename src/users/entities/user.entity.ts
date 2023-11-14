import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '@/common/enum/role.enum';
import { BaseEntity } from '@/common/config/base.entity';

@Entity()
export class User extends BaseEntity {

  @PrimaryColumn()
  doc_type: string;

  @PrimaryColumn()
  doc_number: string;

  @PrimaryColumn({ type: 'enum', default: Role.USER, enum: Role })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  // @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  @Column({ default: 0 })
  points: number;

  @Column({ nullable: true })
  image: string;

}
