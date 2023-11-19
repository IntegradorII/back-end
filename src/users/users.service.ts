import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SegmentsService } from '@/segments/segments.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly segmentsService: SegmentsService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const points = createUserDto.points || 0;
    const segment = await this.getSegment(points);
    const newUser = this.userRepository.create(createUserDto);
    newUser.segment = segment;
    return this.userRepository.save(newUser);
  }

  async getSegment(points: number) {
    let segment = undefined;
    const segments = await this.segmentsService.findAllByRequiredPointsSortAsc();
    if(segments.length > 0) {
      let i = 0;
      while (i < segments.length) {
        if (points >= segments[i].required_points) {
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

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
        where: { email },
        select: [ 'doc_type', 'doc_number', 'email', 'password', 'role'],
      }
    );
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneByDocTypeAndDocNumber(doc_type: string, doc_number: string) {
    const user = await this.userRepository.findOneBy({ doc_type, doc_number });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
