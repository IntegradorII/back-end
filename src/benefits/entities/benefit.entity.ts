import { BenefitType } from '@/benefit-type/entities/benefit-type.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Benefit {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ default: 1 })
  estatus: number;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
  
  @ManyToOne(() => BenefitType, benefitType => benefitType.id, {
    eager: true,
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
  })
  benefit_type: BenefitType;

}
