import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlliedBrandsService } from './allied-brands.service';
import { CreateAlliedBrandDto } from './dto/create-allied-brand.dto';
import { UpdateAlliedBrandDto } from './dto/update-allied-brand.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('allied-brands')
@ApiBearerAuth()
@Auth(Role.ADMIN)
@Controller('allied-brands')
export class AlliedBrandsController {
  constructor(private readonly alliedBrandsService: AlliedBrandsService) {}

  @Post()
  create(@Body() createAlliedBrandDto: CreateAlliedBrandDto) {
    return this.alliedBrandsService.create(createAlliedBrandDto);
  }

  @Get()
  findAll() {
    return this.alliedBrandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alliedBrandsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlliedBrandDto: UpdateAlliedBrandDto) {
    return this.alliedBrandsService.update(id, updateAlliedBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alliedBrandsService.remove(id);
  }
}
