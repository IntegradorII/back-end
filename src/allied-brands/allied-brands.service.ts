import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlliedBrandDto } from './dto/create-allied-brand.dto';
import { UpdateAlliedBrandDto } from './dto/update-allied-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlliedBrand } from './entities/allied-brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlliedBrandsService {

  constructor(
    @InjectRepository(AlliedBrand)
    private readonly alliedBrandRepository: Repository<AlliedBrand>
  ) { }

  async create(createAlliedBrandDto: CreateAlliedBrandDto) {
    const alliedBrand = await this.findOneByName(createAlliedBrandDto.name);
    if(alliedBrand) {
      throw new ConflictException('Allied brand already exists');
    }
    const newAlliedBrand = this.alliedBrandRepository.create(createAlliedBrandDto);
    return this.alliedBrandRepository.save(newAlliedBrand);
  }

  findAll() {
    return this.alliedBrandRepository.find();
  }

  findOne(id: number) {
    return this.alliedBrandRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.alliedBrandRepository.findOneBy({ name });
  }

  async update(id: number, updateAlliedBrandDto: UpdateAlliedBrandDto) {
    let alliedBrand = await this.findOne(id);
    if(!alliedBrand) {
      throw new NotFoundException('Allied brand not found');
    }
    if(updateAlliedBrandDto.name !== alliedBrand.name) {
      alliedBrand = await this.findOneByName(updateAlliedBrandDto.name);
      if(alliedBrand) {
        throw new ConflictException('Allied brand name already exists');
      }
    }
    return this.alliedBrandRepository.update(id, updateAlliedBrandDto);
  }

  remove(id: number) {
    return this.alliedBrandRepository.delete(id);
  }
}
