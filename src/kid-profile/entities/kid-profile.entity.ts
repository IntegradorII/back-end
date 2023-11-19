import { BaseEntity } from '@/common/config/base.entity';
import { BottomSize } from '@/common/enum/botton-size.enum';
import { Gender } from '@/common/enum/gender.enum';
import { IdType } from '@/common/enum/id-type.enum';
import { Relationship } from '@/common/enum/relationship.enum';
import { TopSize } from '@/common/enum/top-size.enum';
import { User } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class KidProfile extends BaseEntity {
  
  @Column({ type: 'enum', enum: IdType })
  docType: string;

  @Column({ nullable: false })
  docNumber: string;

  @ManyToOne(() => User, user => user.id, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  userEmail: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @Column({ nullable: false })
  birth_date: Date;

  @Column({ type: 'enum', enum: TopSize, nullable: false })
  topSize: TopSize;

  @Column({ type: 'enum', enum: BottomSize, nullable: false })
  bottomSize: BottomSize;

  @Column({ nullable: false })
  shoesSize: number;

  @Column({ type: 'enum', enum: Relationship, nullable: false })
  relationship: Relationship;

}
