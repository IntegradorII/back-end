import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Segment } from './entities/segment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SegmentsService {

  constructor(
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>
  ) { }

  async create(createSegmentDto: CreateSegmentDto) {
    const { name, requiredPoints } = createSegmentDto;
    let segment = await this.segmentRepository.findOneBy({ name });
    if(segment) {
      throw new ConflictException('Segment already exists');
    }
    segment = await this.segmentRepository.findOneBy({ requiredPoints });
    if(segment){
      throw new ConflictException('Required points most be unique');
    }
    const newSegment = this.segmentRepository.create(createSegmentDto);
    return this.segmentRepository.save(newSegment);
  }

  findAll() {
    return this.segmentRepository.find();
  }

  findAllByRequiredPointsSortAsc() {
    return this.segmentRepository.find({
      order: {
        requiredPoints: 'ASC',
      },
      relations: ['benefits'],
    });
  }

  findOne(id: string) {
    return this.segmentRepository.findOne({
      where: {
        id,
      },
      relations: ['benefits'],
    });
  }

  findOneByName(name: string) {
    return this.segmentRepository.findOneBy({ name });
  }

  findOneByRequiredPoints(requiredPoints: number) {
    return this.segmentRepository.findOneBy({ requiredPoints });
  }

  async update(id: string, updateSegmentDto: UpdateSegmentDto) {
    let segment = await this.findOne(id);
    if(!segment) {
      throw new NotFoundException('Segment not found');
    }
    const { name, requiredPoints } = updateSegmentDto;
    if(name !== segment.name) {
      segment = await this.findOneByName(name);
      if(segment) {
        throw new ConflictException('Segment name already exists');
      }
    }
    if(requiredPoints !== undefined && requiredPoints !== segment.requiredPoints) {
      segment = await this.findOneByRequiredPoints(requiredPoints);
      if(segment) {
        throw new ConflictException('Required points already exists');
      }
    }
    return this.segmentRepository.update(id, updateSegmentDto);
  }

  async remove(id: string) {
    const segment = await this.findOne(id);
    if(!segment) {
      throw new NotFoundException('Segment not found');
    }
    return this.segmentRepository.delete(id);
  }
}
