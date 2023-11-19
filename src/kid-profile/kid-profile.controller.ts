import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException } from '@nestjs/common';
import { KidProfileService } from './kid-profile.service';
import { CreateKidProfileDto } from './dto/create-kid-profile.dto';
import { UpdateKidProfileDto } from './dto/update-kid-profile.dto';
import { isUUID } from 'class-validator';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { RequestWithUser } from '@/auth/auth.controller';

@Auth(Role.ADMIN, Role.USER)
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
    if(!isUUID(id)) throw new BadRequestException('Profile not found');
    return this.kidProfileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidProfileDto: UpdateKidProfileDto, @Req() req: RequestWithUser) {
    return this.kidProfileService.update(id, updateKidProfileDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidProfileService.remove(id);
  }
}
