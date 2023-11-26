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

  findOne(id: string) {
    return this.benefitTypeRepository.findOneBy({ id });
  }

  findOneByType(type: number) {
    return this.benefitTypeRepository.findOneBy({ type });
  }

  async update(id: string, updateBenefitTypeDto: UpdateBenefitTypeDto) {
    
    let benefitType = await this.findOne(id);
    if(!benefitType) {
      throw new NotFoundException('Benefit type not found');
    }
    if(updateBenefitTypeDto.type !== benefitType.type) {
      benefitType = await this.findOneByType(updateBenefitTypeDto.type);
      if(benefitType) {
        throw new NotFoundException('Benefit type already exists');
      }
    }

    return this.benefitTypeRepository.update(id, updateBenefitTypeDto);
  }

  remove(id: string) {
    return this.benefitTypeRepository.delete(id);
  }
}
