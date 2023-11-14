import { Module } from '@nestjs/common';
import { BenefitTypeService } from './benefit-type.service';
import { BenefitTypeController } from './benefit-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenefitType } from './entities/benefit-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BenefitType]),
  ],
  controllers: [BenefitTypeController],
  providers: [BenefitTypeService],
  exports: [BenefitTypeService]
})
export class BenefitTypeModule {}
