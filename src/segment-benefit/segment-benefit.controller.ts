import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SegmentBenefitService } from './segment-benefit.service';
import { CreateSegmentBenefitDto } from './dto/create-segment-benefit.dto';
import { UpdateSegmentBenefitDto } from './dto/update-segment-benefit.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('segment-benefit')
@Auth(Role.ADMIN)
@Controller('segment-benefit')
export class SegmentBenefitController {
  constructor(private readonly segmentBenefitService: SegmentBenefitService) {}

  @Post()
  create(@Body() createSegmentBenefitDto: CreateSegmentBenefitDto) {
    return this.segmentBenefitService.create(createSegmentBenefitDto);
  }

  @Get()
  findAll() {
    return this.segmentBenefitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentBenefitService.findOne(id);
  }

  @Get('segment/:id')
  findAllBySegmentId(@Param('id') id: string) {
    return this.segmentBenefitService.findAllBySegmentId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSegmentBenefitDto: UpdateSegmentBenefitDto) {
    return this.segmentBenefitService.update(id, updateSegmentBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.segmentBenefitService.remove(id);
  }
}
