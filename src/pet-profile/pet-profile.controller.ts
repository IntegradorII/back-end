import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetProfileService } from './pet-profile.service';
import { CreatePetProfileDto } from './dto/create-pet-profile.dto';
import { UpdatePetProfileDto } from './dto/update-pet-profile.dto';

@Controller('pet-profile')
export class PetProfileController {
  constructor(private readonly petProfileService: PetProfileService) {}

  @Post()
  create(@Body() createPetProfileDto: CreatePetProfileDto) {
    return this.petProfileService.create(createPetProfileDto);
  }

  @Get()
  findAll() {
    return this.petProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetProfileDto: UpdatePetProfileDto) {
    return this.petProfileService.update(+id, updatePetProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petProfileService.remove(+id);
  }
}
