import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KidProfileService } from './kid-profile.service';
import { CreateKidProfileDto } from './dto/create-kid-profile.dto';
import { UpdateKidProfileDto } from './dto/update-kid-profile.dto';

@Controller('kid-profile')
export class KidProfileController {
  constructor(private readonly kidProfileService: KidProfileService) {}

  @Post()
  create(@Body() createKidProfileDto: CreateKidProfileDto) {
    return this.kidProfileService.create(createKidProfileDto);
  }

  @Get()
  findAll() {
    return this.kidProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kidProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidProfileDto: UpdateKidProfileDto) {
    return this.kidProfileService.update(+id, updateKidProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidProfileService.remove(+id);
  }
}
