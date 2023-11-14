import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenefitTypeService } from './benefit-type.service';
import { CreateBenefitTypeDto } from './dto/create-benefit-type.dto';
import { UpdateBenefitTypeDto } from './dto/update-benefit-type.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';

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

  @Get(':type')
  findOne(@Param('type') type: string) {
    return this.benefitTypeService.findOne(+type);
  }

  @Patch(':type')
  update(@Param('type') type: string, @Body() updateBenefitTypeDto: UpdateBenefitTypeDto) {
    return this.benefitTypeService.update(+type, updateBenefitTypeDto);
  }

  @Delete(':type')
  remove(@Param('type') type: string) {
    return this.benefitTypeService.remove(+type);
  }
}
