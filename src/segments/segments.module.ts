import { Module } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { SegmentsController } from './segments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from './entities/segment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Segment
    ])
  ],
  controllers: [SegmentsController],
  providers: [SegmentsService],
  exports: [SegmentsService]
})
export class SegmentsModule {}
