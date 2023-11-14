import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBenefitTypeDto } from './dto/create-benefit-type.dto';
import { UpdateBenefitTypeDto } from './dto/update-benefit-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BenefitType } from './entities/benefit-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BenefitTypeService {

  constructor(
    @InjectRepository(BenefitType)
    private readonly benefitTypeRepository: Repository<BenefitType>
  ) { }

  create(createBenefitTypeDto: CreateBenefitTypeDto) {
    const newBenefitType = this.benefitTypeRepository.create(createBenefitTypeDto);
    return this.benefitTypeRepository.save(newBenefitType);
  }

  findAll() {
    return this.benefitTypeRepository.find();
  }

  findOne(id: number) {
    return this.benefitTypeRepository.findOneBy({ id });
  }

  findOneByType(type: number) {
    return this.benefitTypeRepository.findOneBy({ type });
  }

  async update(id: number, updateBenefitTypeDto: UpdateBenefitTypeDto) {
    
    const benefitType = await this.findOne(id);
    if(!benefitType) {
      throw new NotFoundException('Benefit type not found');
    }

    return this.benefitTypeRepository.update(id, updateBenefitTypeDto);
  }

  remove(id: number) {
    return this.benefitTypeRepository.delete(id);
  }
}
