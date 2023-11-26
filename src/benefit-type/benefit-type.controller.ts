import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { BenefitTypeService } from './benefit-type.service';
import { CreateBenefitTypeDto } from './dto/create-benefit-type.dto';
import { UpdateBenefitTypeDto } from './dto/update-benefit-type.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { isUUID } from 'class-validator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('benefit-type')
@ApiBearerAuth()
@Auth(Role.ADMIN)
@Controller('benefit-type')
export class BenefitTypeController {
  constructor(private readonly benefitTypeService: BenefitTypeService) {}

  @Post()
  create(@Body() createBenefitTypeDto: CreateBenefitTypeDto) {
    return this.benefitTypeService.create(createBenefitTypeDto);
  }

  @Get()
  findAll() {
    return this.benefitTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if(!isUUID(id)) {
      throw new BadRequestException('User not found');
    }
    return await this.benefitTypeService.findOne(id);
  }

  @Get('type/:type')
  async findOneByType(@Param('type') type: string) {
    // validemos que el tipo sea un numero
    if(isNaN(+type)) {
      throw new BadRequestException('Benefit type not found');
    }
    return await this.benefitTypeService.findOneByType(+type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBenefitTypeDto: UpdateBenefitTypeDto) {
    return this.benefitTypeService.update(id, updateBenefitTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.benefitTypeService.remove(id);
  }
}
