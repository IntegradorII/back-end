import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetCharacteristicDto } from './dto/create-pet-characteristic.dto';
import { UpdatePetCharacteristicDto } from './dto/update-pet-characteristic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetCharacteristic } from './entities/pet-characteristic.entity';
import { Repository } from 'typeorm';
import { PetProfileService } from '@/pet-profile/pet-profile.service';
import { CharacteristicsService } from '@/characteristics/characteristics.service';

@Injectable()
export class PetCharacteristicService {

  constructor(
    @InjectRepository(PetCharacteristic)
    private readonly petCharacteristicRepository: Repository<PetCharacteristic>,
    private readonly petProfileService: PetProfileService,
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  async create(createPetCharacteristicDto: CreatePetCharacteristicDto) {
    const { petProfileId, characteristicName } = createPetCharacteristicDto;

    const petProfile = await this.petProfileService.findOne(petProfileId);
    if(!petProfile) {
      throw new NotFoundException('Pet Profile not found');
    }

    const characteristic = await this.characteristicsService.findOneByName(characteristicName);
    if(!characteristic) {
      throw new NotFoundException('Characteristic not found');
    }

    const petCharacteristic = await this.petCharacteristicRepository.findOneBy({
      petProfile: {
        id: petProfileId,
      },
      characteristic: {
        id: characteristic.id,
      },
    });

    if(petCharacteristic) {
      throw new NotFoundException('Pet Characteristic already exists');
    }

    const newPetCharacteristic = this.petCharacteristicRepository.create({
      petProfile,
      characteristic,
    });

    return this.petCharacteristicRepository.save(newPetCharacteristic);
  }

  findAll() {
    return this.petCharacteristicRepository.find({
      relations: ['petProfile', 'characteristic'],
    });
  }

  findOne(id: string) {
    return this.petCharacteristicRepository.findOne({
      where: {
        id,
      },
      relations: ['petProfile', 'characteristic'],
    });
  }

  findByPetProfileId(petProfileId: string) {
    return this.petCharacteristicRepository.find({
      where: {
        petProfile: {
          id: petProfileId,
        },
      },
    });
  }

  findByCharacteristicName(characteristicName: string) {
    return this.petCharacteristicRepository.find({
      where: {
        characteristic: {
          name: characteristicName,
        },
      },
    });
  }

  async update(id: string, updatePetCharacteristicDto: UpdatePetCharacteristicDto) {
    let petCharacteristic = await this.findOne(id);
    if(!petCharacteristic) {
      throw new NotFoundException('Pet Characteristic not found');
    }
    let { petProfileId, characteristicName } = updatePetCharacteristicDto;
    // if(petProfileId === petCharacteristic.petProfile.id
    //   && characteristicName === petCharacteristic.characteristic.name) {
    //     return petCharacteristic;
    // }
    if(!petProfileId) {
      petProfileId = petCharacteristic.petProfile.id;
    } else {
      const petProfile = await this.petProfileService.findOne(petProfileId);
      if(!petProfile) {
        throw new NotFoundException('Pet Profile not found');
      }
    }
    if(!characteristicName) {
      characteristicName = petCharacteristic.characteristic.name;
    } else {
      const characteristic = await this.characteristicsService.findOneByName(characteristicName);
      if(!characteristic) {
        throw new NotFoundException('Characteristic not found');
      }
    }
    petCharacteristic = await this.petCharacteristicRepository.findOneBy({
      petProfile: {
        id: petProfileId,
      },
      characteristic: {
        name: characteristicName,
      },
    });
    if(petCharacteristic) {
      throw new ConflictException('Pet Characteristic already exists');
    }

    return this.petCharacteristicRepository.update(id, {
      petProfile: {
        id: petProfileId,
      },
      characteristic: {
        name: characteristicName,
      },
    });
  }

  async remove(id: string) {
    const petCharacteristic = await this.findOne(id);
    if(!petCharacteristic) {
      throw new NotFoundException('Pet Characteristic not found');
    }
    return this.petCharacteristicRepository.delete(id);
  }
}
