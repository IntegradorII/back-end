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
    const { name, required_points } = createSegmentDto;
    let segment = await this.segmentRepository.findOneBy({ name });
    if(segment) {
      throw new ConflictException('Segment already exists');
    }
    segment = await this.segmentRepository.findOneBy({ required_points });
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
        required_points: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.segmentRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.segmentRepository.findOneBy({ name });
  }

  findOneByRequiredPoints(required_points: number) {
    return this.segmentRepository.findOneBy({ required_points });
  }

  async update(id: number, updateSegmentDto: UpdateSegmentDto) {
    let segment = await this.findOne(id);
    if(!segment) {
      throw new NotFoundException('Segment not found');
    }
    const { name, required_points } = updateSegmentDto;
    if(name !== segment.name) {
      segment = await this.findOneByName(name);
      if(segment) {
        throw new ConflictException('Segment name already exists');
      }
    }
    if(required_points !== segment.required_points) {
      segment = await this.findOneByRequiredPoints(required_points);
      if(segment) {
        throw new ConflictException('Required points already exists');
      }
    }
    return this.segmentRepository.update(id, updateSegmentDto);
  }

  async remove(id: number) {
    const segment = await this.findOne(id);
    if(!segment) {
      throw new NotFoundException('Segment not found');
    }
    return this.segmentRepository.delete(id);
  }
}
