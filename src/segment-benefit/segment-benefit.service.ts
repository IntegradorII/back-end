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
    const { segmentId, benefitId } = createSegmentBenefitDto;
    const segment = await this.segmentsService.findOne(segmentId);
    if(!segment) {
      throw new NotFoundException('Segment not found');
    }
    const benefit = await this.benefitService.findOne(benefitId);
    if(!benefit) {
      throw new NotFoundException('Benefit not found');
    }
    const segmentBenefit = await this.segmentBenefitRepository.findOneBy({
      segment: {
        id: segmentId,
      },
      benefit: {
        id: benefitId,
      },
    });
    if(segmentBenefit) {
      throw new NotFoundException('Segment Benefit already exists');
    }
    const newSegmentBenefit = this.segmentBenefitRepository.create({
      segment,
      benefit,
      amount: createSegmentBenefitDto.amount,
    });
    return this.segmentBenefitRepository.save(newSegmentBenefit);
  }

  findAll() {
    return this.segmentBenefitRepository.find({
      relations: ['segment', 'benefit'],
    });
  }

  findAllBySegmentId(segmentId: string) {
    return this.segmentBenefitRepository.find({
      where: {
        segment: {
          id: segmentId,
        },
      },
    });
  }

  findOne(id: string) {
    return this.segmentBenefitRepository.findOneBy({ id });
  }

  async update(id: string, updateSegmentBenefitDto: UpdateSegmentBenefitDto) {
    const segmentBenefit = await this.segmentBenefitRepository.findOneBy({ id });
    if(!segmentBenefit) {
      throw new NotFoundException('Segment Benefit not found');
    }
    const { segmentId, benefitId, amount } = updateSegmentBenefitDto;
    if(segmentId && segmentId !== segmentBenefit.segment.id) {
      const segment = await this.segmentsService.findOne(segmentId);
      if(!segment) {
        throw new NotFoundException('Segment not found');
      }
      segmentBenefit.segment = segment;
    }
    if(benefitId && benefitId !== segmentBenefit.benefit.id) {
      const benefit = await this.benefitService.findOne(benefitId);
      if(!benefit) {
        throw new NotFoundException('Benefit not found');
      }
      segmentBenefit.benefit = benefit;
    }
    return this.segmentBenefitRepository.update(id, {
      amount,
      segment: segmentId ? segmentBenefit.segment : undefined,
      benefit: benefitId ? segmentBenefit.benefit : undefined,
    });
  }

  async remove(id: string) {
    const segmentBenefit = await this.segmentBenefitRepository.findOneBy({ id });
    if(!segmentBenefit) {
      throw new NotFoundException('Segment Benefit not found');
    }
    return this.segmentBenefitRepository.delete(id);
  }
}
