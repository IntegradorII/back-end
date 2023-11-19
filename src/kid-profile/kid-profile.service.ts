import { Injectable } from '@nestjs/common';
import { CreateKidProfileDto } from './dto/create-kid-profile.dto';
import { UpdateKidProfileDto } from './dto/update-kid-profile.dto';

@Injectable()
export class KidProfileService {
  create(createKidProfileDto: CreateKidProfileDto) {
    return 'This action adds a new kidProfile';
  }

  findAll() {
    return `This action returns all kidProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kidProfile`;
  }

  update(id: number, updateKidProfileDto: UpdateKidProfileDto) {
    return `This action updates a #${id} kidProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} kidProfile`;
  }
}
