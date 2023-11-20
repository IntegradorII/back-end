import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetCharacteristicService } from './pet-characteristic.service';
import { CreatePetCharacteristicDto } from './dto/create-pet-characteristic.dto';
import { UpdatePetCharacteristicDto } from './dto/update-pet-characteristic.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';

@Auth(Role.ADMIN, Role.USER)
@Controller('pet-characteristic')
export class PetCharacteristicController {
  constructor(private readonly petCharacteristicService: PetCharacteristicService) {}

  @Post()
  create(@Body() createPetCharacteristicDto: CreatePetCharacteristicDto) {
    return this.petCharacteristicService.create(createPetCharacteristicDto);
  }

  @Get()
  findAll() {
    return this.petCharacteristicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petCharacteristicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetCharacteristicDto: UpdatePetCharacteristicDto) {
    return this.petCharacteristicService.update(id, updatePetCharacteristicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petCharacteristicService.remove(id);
  }
}
