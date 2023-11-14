import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSegmentBenefitDto } from './dto/create-segment-benefit.dto';
import { UpdateSegmentBenefitDto } from './dto/update-segment-benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SegmentsService } from '@/segments/segments.service';
import { BenefitsService } from '@/benefits/benefits.service';
import { SegmentBenefit } from './entities/segment-benefit.entity';

@Injectable()
export class SegmentBenefitService {

  constructor(
    @InjectRepository(SegmentBenefit)
    private readonly segmentBenefitRepository: Repository<SegmentBenefit>,
    private readonly segmentsService: SegmentsService,
    private readonly benefitService: BenefitsService,

  ) {}

  async create(createSegmentBenefitDto: CreateSegmentBenefitDto) {
    const { segment_id, benefit_id } = createSegmentBenefitDto;
    const segment = await this.segmentsService.findOne(segment_id);
    if(!segment) {
      throw new NotFoundException('Segment not found');
    }
    const benefit = await this.benefitService.findOne(benefit_id);
    if(!benefit) {
      throw new NotFoundException('Benefit not found');
    }
    const segmentBenefit = await this.segmentBenefitRepository.findOneBy({
      segment_id: {
        id: segment_id,
      },
      benefit_id: {
        id: benefit_id,
      },
    });
    if(segmentBenefit) {
      throw new NotFoundException('Segment Benefit already exists');
    }
    const newSegmentBenefit = this.segmentBenefitRepository.create({
      segment_id: segment,
      benefit_id: benefit,
      amount: createSegmentBenefitDto.amount,
    });
    return this.segmentBenefitRepository.save(newSegmentBenefit);
  }

  findAll() {
    return this.segmentBenefitRepository.find();
  }

  findAllBySegmentId(segment_id: number) {
    return this.segmentBenefitRepository.find({
      where: {
        segment_id: {
          id: segment_id,
        },
      },
    });
  }

  findOne(id: number) {
    return this.segmentBenefitRepository.findOneBy({ id });
  }

  async update(id: number, updateSegmentBenefitDto: UpdateSegmentBenefitDto) {
    const segmentBenefit = await this.segmentBenefitRepository.findOneBy({ id });
    if(!segmentBenefit) {
      throw new NotFoundException('Segment Benefit not found');
    }
    const { segment_id, benefit_id, amount } = updateSegmentBenefitDto;
    if(segment_id && segment_id !== segmentBenefit.segment_id.id) {
      const segment = await this.segmentsService.findOne(segment_id);
      if(!segment) {
        throw new NotFoundException('Segment not found');
      }
      segmentBenefit.segment_id = segment;
    }
    if(benefit_id && benefit_id !== segmentBenefit.benefit_id.id) {
      const benefit = await this.benefitService.findOne(benefit_id);
      if(!benefit) {
        throw new NotFoundException('Benefit not found');
      }
      segmentBenefit.benefit_id = benefit;
    }
    return this.segmentBenefitRepository.update(id, {
      amount,
      segment_id: segment_id ? segmentBenefit.segment_id : undefined,
      benefit_id: benefit_id ? segmentBenefit.benefit_id : undefined,
    });
  }

  async remove(id: number) {
    const segmentBenefit = await this.segmentBenefitRepository.findOneBy({ id });
    if(!segmentBenefit) {
      throw new NotFoundException('Segment Benefit not found');
    }
    return this.segmentBenefitRepository.delete(id);
  }
}
