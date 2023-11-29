import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetProfileDto } from './dto/create-pet-profile.dto';
import { UpdatePetProfileDto } from './dto/update-pet-profile.dto';
import { UsersService } from '@/users/users.service';
import { PetProfile } from './entities/pet-profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserJwt } from '@/auth/dto/user-jwt.dto';
import { Role } from '@/common/enum/role.enum';

@Injectable()
export class PetProfileService {

  constructor(
    @InjectRepository(PetProfile)
    private readonly petProfileRepository: Repository<PetProfile>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPetProfileDto: CreatePetProfileDto, user: UserJwt) {
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
    return this.petProfileRepository.find({
      relations: ['user', 'petCharacteristics', 'petCharacteristics.characteristic'],
    });
  }

  findOne(id: string) {
    return this.petProfileRepository.findOne({
      where: {
        id
      },
      relations: ['user', 'petCharacteristics', 'petCharacteristics.characteristic'],
    });
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

  async update(id: string, updatePetProfileDto: UpdatePetProfileDto, user: UserJwt) {
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
