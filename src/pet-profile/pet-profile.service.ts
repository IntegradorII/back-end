import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetProfileDto } from './dto/create-pet-profile.dto';
import { UpdatePetProfileDto } from './dto/update-pet-profile.dto';
import { UsersService } from '@/users/users.service';
import { PetProfile } from './entities/pet-profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserData } from '@/auth/auth.controller';
import { Role } from '@/common/enum/role.enum';

@Injectable()
export class PetProfileService {

  constructor(
    @InjectRepository(PetProfile)
    private readonly petProfileRepository: Repository<PetProfile>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPetProfileDto: CreatePetProfileDto, user: UserData) {
    const { userEmail } = createPetProfileDto;
    if(user.role === Role.USER) {
      if(userEmail !== user.email) {
        throw new BadRequestException('Cannot create profile for other user');
      }
    } else {
      if(!userEmail) {
        throw new BadRequestException('User email is required');
      }
    }

    const myuser = await this.usersService.findOneByEmail(userEmail);
    if(!myuser) {
      throw new BadRequestException('User not found');
    }
    const profiles = await this.findByUserEmail(userEmail);
    if(profiles.length > 1) {
      throw new BadRequestException('User already has 2 profiles');
    }
    const newProfile = this.petProfileRepository.create({
      ...createPetProfileDto,
      user: myuser
    });    
    
    return this.petProfileRepository.save(newProfile);
  }

  findAll() {
    return this.petProfileRepository.find();
  }

  findOne(id: string) {
    return this.petProfileRepository.findOneBy({ id });
  }

  findByUserId(userId: string) {
    return this.petProfileRepository.find({ 
      where: {
        user: {
          id: userId
        }
      }
    });
  }

  findByUserEmail(userEmail: string) {
    return this.petProfileRepository.find({ 
      where: {
        user: {
          email: userEmail
        }
      }
    });
  }

  async update(id: string, updatePetProfileDto: UpdatePetProfileDto, user: UserData) {
    const { userEmail } = updatePetProfileDto;
    const profile = await this.findOne(id);
    if(!profile) {
      throw new NotFoundException('Profile not found');
    }
    if(user.role === Role.USER) {
      if(profile.user.email !== user.email) {
        throw new BadRequestException('Cannot update profile for other user');
      }
      if(userEmail && userEmail !== profile.user.email) {
        throw new BadRequestException('Cannot update email');
      }
    }
    return this.petProfileRepository.update(id, updatePetProfileDto);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    if(!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.petProfileRepository.delete(id);
  }
}
