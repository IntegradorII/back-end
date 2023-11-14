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

  @OneToMany(() => Benefit, benefit => benefit.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  benefits: Benefit[];

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

}
