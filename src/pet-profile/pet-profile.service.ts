import { Injectable } from '@nestjs/common';
import { CreatePetProfileDto } from './dto/create-pet-profile.dto';
import { UpdatePetProfileDto } from './dto/update-pet-profile.dto';

@Injectable()
export class PetProfileService {
  create(createPetProfileDto: CreatePetProfileDto) {
    return 'This action adds a new petProfile';
  }

  findAll() {
    return `This action returns all petProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petProfile`;
  }

  update(id: number, updatePetProfileDto: UpdatePetProfileDto) {
    return `This action updates a #${id} petProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} petProfile`;
  }
}
