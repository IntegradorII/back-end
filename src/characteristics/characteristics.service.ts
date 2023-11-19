import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Characteristic } from './entities/characteristic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharacteristicsService {

  constructor(
    @InjectRepository(Characteristic)
    private readonly characteristicRepository: Repository<Characteristic>,
  ) { }

  async create(createCharacteristicDto: CreateCharacteristicDto) {
    const { name } = createCharacteristicDto;
    const characteristic = await this.characteristicRepository.findOneBy({ name });
    if(characteristic) {
      throw new NotFoundException('Characteristic already exists');
    }

    const newCharacteristic = this.characteristicRepository.create(createCharacteristicDto);

    return this.characteristicRepository.save(newCharacteristic);
  }

  findAll() {
    return this.characteristicRepository.find();
  }

  findOne(id: number) {
    return this.characteristicRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.characteristicRepository.findOneBy({ name });
  }

  async update(id: number, updateCharacteristicDto: UpdateCharacteristicDto) {
    let characteristic = await this.findOne(id);
    if(!characteristic) {
      throw new NotFoundException('Characteristic not found');
    }
    const { name } = updateCharacteristicDto;
    if(name) {
      characteristic = await this.findOneByName(name);
      if(characteristic) {
        throw new ConflictException('Characteristic already exists');
      }
    }
    return this.characteristicRepository.update(id, updateCharacteristicDto);
  }

  async remove(id: number) {
    const characteristic = await this.findOne(id);
    if(!characteristic) {
      throw new NotFoundException('Characteristic not found');
    }
    return this.characteristicRepository.delete(id);
  }
}
