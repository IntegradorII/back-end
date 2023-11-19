import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateKidProfileDto } from './dto/create-kid-profile.dto';
import { UpdateKidProfileDto } from './dto/update-kid-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KidProfile } from './entities/kid-profile.entity';
import { Repository } from 'typeorm';
import { UserData } from '@/auth/auth.controller';
import { Role } from '@/common/enum/role.enum';

@Injectable()
export class KidProfileService {

  constructor(
    @InjectRepository(KidProfile)
    private readonly kidProfileRepository: Repository<KidProfile>
  ) {}

  async create(createKidProfileDto: CreateKidProfileDto) {
    const { docType, docNumber, userEmail } = createKidProfileDto;
    const profiles = await this.findByDocTypeAndDocNumber(docType, docNumber);
    for(const profile of profiles) {
      if(profile && profile.user.email === userEmail) {
        throw new ConflictException('Profile already exists');
      }
    }
    const newProfile = this.kidProfileRepository.create(createKidProfileDto);
    return this.kidProfileRepository.save(newProfile);
  }

  findAll() {
    return this.kidProfileRepository.find();
  }

  findOne(id: string) {
    return this.kidProfileRepository.findOneBy({ id });
  }

  findByDocTypeAndDocNumber(docType: string, docNumber: string) {
    return this.kidProfileRepository.find({ where: {docType, docNumber} });
  }

  async update(id: string, updateKidProfileDto: UpdateKidProfileDto, user: UserData) {
    const { userEmail } = updateKidProfileDto;
    const profile = await this.findOne(id);
    if(!profile) {
      throw new NotFoundException('Profile not found');
    }
    if(user.role === Role.USER) {
      if(profile.user.email !== user.email) {
        throw new BadRequestException('Cannot update other user profile');
      }
      if(userEmail && userEmail !== profile.user.email) {
        throw new BadRequestException('Cannot update email');
      }
    }
    return this.kidProfileRepository.update(id, updateKidProfileDto);
  }

  remove(id: string) {
    const profile = this.findOne(id);
    if(!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.kidProfileRepository.delete(id);
  }
}
