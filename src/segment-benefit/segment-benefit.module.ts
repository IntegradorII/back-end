import { Module } from '@nestjs/common';
import { SegmentBenefitService } from './segment-benefit.service';
import { SegmentBenefitController } from './segment-benefit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegmentBenefit } from './entities/segment-benefit.entity';
import { BenefitsModule } from '@/benefits/benefits.module';
import { SegmentsModule } from '@/segments/segments.module';

@Module({
  imports: [
    BenefitsModule,
    SegmentsModule,
    TypeOrmModule.forFeature([SegmentBenefit]),
  ],
  controllers: [SegmentBenefitController],
  providers: [SegmentBenefitService],
})
export class SegmentBenefitModule {}
