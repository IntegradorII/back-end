import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateKidProfileDto } from './dto/create-kid-profile.dto';
import { UpdateKidProfileDto } from './dto/update-kid-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { KidProfile } from './entities/kid-profile.entity';
import { Repository } from 'typeorm';
import { UserJwt } from '@/auth/dto/user-jwt.dto';
import { Role } from '@/common/enum/role.enum';
import { UsersService } from '@/users/users.service';

@Injectable()
export class KidProfileService {

  constructor(
    @InjectRepository(KidProfile)
    private readonly kidProfileRepository: Repository<KidProfile>,
    private readonly usersService: UsersService
  ) {}

  async create(createKidProfileDto: CreateKidProfileDto, user: UserJwt) {
    const { docType, docNumber, userEmail } = createKidProfileDto;
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
      throw new NotFoundException('User not found');
    }
    const profiles = await this.findByUserEmail(userEmail);
    if(profiles.length > 2) {
      throw new ConflictException('User already has 3 profiles');
    }
    for(const profile of profiles) {
      if(profile.docType === docType && profile.docNumber === docNumber) {
        throw new ConflictException('Profile already exists');
      }
    }
    const newProfile = this.kidProfileRepository.create({
      ...createKidProfileDto,
      user: myuser
    });
    return this.kidProfileRepository.save(newProfile);
  }

  findAll() {
    return this.kidProfileRepository.find();
  }

  findByUserId(userId: string) {
    return this.kidProfileRepository.find({ 
      where: {
        user: {
          id: userId
        }
      }
    });
  }

  findByUserEmail(userEmail: string) {
    return this.kidProfileRepository.find({ 
      where: {
        user: {
          email: userEmail
        }
      }
    });
  }

  findOne(id: string) {
    return this.kidProfileRepository.findOneBy({ id });
  }

  findByDocTypeAndDocNumber(docType: string, docNumber: string) {
    return this.kidProfileRepository.find({ where: {docType, docNumber} });
  }

  async update(id: string, updateKidProfileDto: UpdateKidProfileDto, user: UserJwt) {
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

  async remove(id: string) {
    const profile = await this.findOne(id);
    if(!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.kidProfileRepository.delete(id);
  }
}
