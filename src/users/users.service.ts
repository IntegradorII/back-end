import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SegmentsService } from '@/segments/segments.service';
import { Role } from '@/common/enum/role.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly segmentsService: SegmentsService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const points = createUserDto.points || 0;
    let segment = undefined;
    if(createUserDto.role !== Role.ADMIN) {
      segment = await this.getSegment(points);
    }
    const newUser = this.userRepository.create(createUserDto);
    if(segment) {
      newUser.segment = segment;
    }
    return this.userRepository.save(newUser);
  }

  async getSegment(points: number) {
    let segment = undefined;
    const segments = await this.segmentsService.findAllByRequiredPointsSortAsc();
    if(segments.length > 0) {
      let i = 0;
      while (i < segments.length) {
        if (points >= segments[i].requiredPoints) {
          segment = segments[i];
        } else {
          break;
        }
        i++;
      }
      if(segment === undefined) {
        throw new BadRequestException('No segment found, that user must be in a segment');
      }
    } else {
      throw new BadRequestException('No segments found');
    }
    return segment;
  }

  async assignSegment(user: User) {
    const segment = await this.getSegment(user.points);
    user.segment = segment;
    return this.userRepository.save(user);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['segment'],
    });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
        where: { email },
        select: [ 'docType', 'docNumber', 'email', 'password', 'role'],
      }
    );
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByDocTypeAndDocNumber(docType: string, docNumber: string) {
    return this.userRepository.findOneBy({ docType, docNumber });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // const { docType, docNumber, email, password, role } = updateUserDto;
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
