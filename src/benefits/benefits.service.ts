import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Benefit } from './entities/benefit.entity';
import { BenefitTypeService } from '@/benefit-type/benefit-type.service';

@Injectable()
export class BenefitsService {

  constructor(
    @InjectRepository(Benefit)
    private readonly benefitRepository: Repository<Benefit>,
    private readonly benefitTypeService: BenefitTypeService
  ) { }

  async create(createBenefitDto: CreateBenefitDto) {

    const type = createBenefitDto.benefitType;
    const benefitType = await this.benefitTypeService.findOneByType(type);

    if (!benefitType) {
      throw new NotFoundException('Benefit type not found');
    }

    const newBenefit: DeepPartial<Benefit> = 
    {
      ...createBenefitDto,
      benefitType: benefitType,
    };

    const benefit = this.benefitRepository.create(newBenefit);

    return this.benefitRepository.save(benefit);
  }


  findAll() {
    return this.benefitRepository.find();
  }

  findOne(id: string) {
    return this.benefitRepository.findOneBy({ id });
  }

  async update(id: string, updateBenefitDto: UpdateBenefitDto) {
    const benefit = this.findOne(id);
    if(!benefit) {
      throw new NotFoundException('Benefit not found');
    }

    const newBenefit: DeepPartial<Benefit> = {
      ...updateBenefitDto,
      benefitType: undefined
    };

    if(updateBenefitDto.benefitType) {
      const type = updateBenefitDto.benefitType;
      const benefitType = await this.benefitTypeService.findOneByType(type);
      if(!benefitType) {
        throw new NotFoundException('Benefit type not found');
      }
      newBenefit.benefitType = benefitType;
    }

    return this.benefitRepository.update(id, newBenefit);
  }

  remove(id: string) {
    return this.benefitRepository.delete(id);
  }
}
