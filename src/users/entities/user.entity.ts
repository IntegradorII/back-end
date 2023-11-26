import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '@/common/enum/role.enum';
import { BaseEntity } from '@/common/config/base.entity';
import { UserBenefit } from '@/user-benefit/entities/user-benefit.entity';
import { Segment } from '@/segments/entities/segment.entity';
import { DocType } from '@/common/enum/doc-type.enum';
import { KidProfile } from '@/kid-profile/entities/kid-profile.entity';
// import { transformer } from '@/common/util/trasformer';
import { Session } from './session.entity';
import { Account } from './account.entity';
import { PetProfile } from '@/pet-profile/entities/pet-profile.entity';
import { Sale } from '@/sales/entities/sale.entity';

@Entity({ name: 'User' })
export class User extends BaseEntity {

  @Column({ type: 'enum', enum: DocType, nullable: true })
  docType: string;

  @Column({ nullable: true })
  docNumber: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @Column({ type: 'text', nullable: true })
  name: string;
  
  @Column({ type: 'text', unique: true, nullable: true })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerified: string;
  
  @Column({ type: 'text', nullable: true })
  image: string;
  
  @Column({ select: false, nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  // @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  @Column({ default: 0 })
  points: number;

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];

  @OneToMany(() => UserBenefit, (userBenefit) => userBenefit.user)
  benefits: UserBenefit[];

  @ManyToOne(() => Segment, (segment) => segment.users, {
    nullable: true,
  })
  segment: Segment;

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @OneToMany(() => KidProfile, (kidProfile) => kidProfile.user)
  kidProfiles: KidProfile[];

  @OneToMany(() => PetProfile, (petProfile) => petProfile.user)
  petProfiles: PetProfile[];

}
