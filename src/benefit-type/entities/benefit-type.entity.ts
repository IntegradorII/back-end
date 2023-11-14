import { Benefit } from '@/benefits/entities/benefit.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BenefitType {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  type: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Benefit, benefit => benefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  benefits: Benefit[];

}
