import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Role } from 'src/common/enum/role.enum';

@Entity()
export class User {

  @PrimaryColumn()
  doc_type: string;

  @PrimaryColumn()
  doc_number: string;

  @PrimaryColumn({ default: Role.USER })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  // @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  @Column({ default: 0 })
  points: number

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
