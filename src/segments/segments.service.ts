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
    const segment = await this.segmentRepository.findOneBy({ name: createSegmentDto.name });
    if(segment) {
      throw new ConflictException('Segment already exists');
    }
    const newSegment = this.segmentRepository.create(createSegmentDto);
    return this.segmentRepository.save(newSegment);
  }

  findAll() {
    return this.segmentRepository.find();
  }

  findOne(id: number) {
    return this.segmentRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.segmentRepository.findOneBy({ name });
  }

  async update(id: number, updateSegmentDto: UpdateSegmentDto) {
    let segment = await this.findOne(id);
    if(!segment) {
      throw new NotFoundException('Segment not found');
    }
    if(updateSegmentDto.name !== segment.name) {
      segment = await this.findOneByName(updateSegmentDto.name);
      if(segment) {
        throw new ConflictException('Segment name already exists');
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
