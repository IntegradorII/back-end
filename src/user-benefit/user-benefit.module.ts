import { Module } from '@nestjs/common';
import { UserBenefitService } from './user-benefit.service';
import { UserBenefitController } from './user-benefit.controller';
import { BenefitsModule } from '@/benefits/benefits.module';
import { UsersModule } from '@/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBenefit } from './entities/user-benefit.entity';

@Module({
  imports: [
    UsersModule,
    BenefitsModule,
    TypeOrmModule.forFeature([UserBenefit]),
  ],
  controllers: [UserBenefitController],
  providers: [UserBenefitService],
  exports: [UserBenefitService],
})
export class UserBenefitModule {}
