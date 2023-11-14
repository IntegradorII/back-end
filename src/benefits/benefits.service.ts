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

    const type = createBenefitDto.benefit_type;
    const benefitType = await this.benefitTypeService.findOneByType(type);

    if (!benefitType) {
      throw new NotFoundException('Benefit type not found');
    }

    const newBenefit: DeepPartial<Benefit> = 
    {
      ...createBenefitDto,
      benefit_type: benefitType,
    };

    const benefit = this.benefitRepository.create(newBenefit);

    return this.benefitRepository.save(benefit);
  }


  findAll() {
    return this.benefitRepository.find();
  }

  findOne(id: number) {
    return this.benefitRepository.findOneBy({ id });
  }

  async update(id: number, updateBenefitDto: UpdateBenefitDto) {
    const benefit = this.findOne(id);
    if(!benefit) {
      throw new NotFoundException('Benefit not found');
    }

    const newBenefit: DeepPartial<Benefit> = {
      ...updateBenefitDto,
      benefit_type: undefined
    };

    if(updateBenefitDto.benefit_type) {
      const type = updateBenefitDto.benefit_type;
      const benefitType = await this.benefitTypeService.findOne(type);
      if(!benefitType) {
        throw new NotFoundException('Benefit type not found');
      }
      newBenefit.benefit_type = benefitType;
    }

    return this.benefitRepository.update(id, newBenefit);
  }

  remove(id: number) {
    return this.benefitRepository.delete(id);
  }
}
