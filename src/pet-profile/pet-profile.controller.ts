import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PetProfileService } from './pet-profile.service';
import { CreatePetProfileDto } from './dto/create-pet-profile.dto';
import { UpdatePetProfileDto } from './dto/update-pet-profile.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { RequestWithUser } from '@/auth/auth.controller';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('pet-profile')
@ApiBearerAuth()
@Auth(Role.ADMIN, Role.USER)
@Controller('pet-profile')
export class PetProfileController {
  constructor(private readonly petProfileService: PetProfileService) {}

  @Post()
  create(@Body() createPetProfileDto: CreatePetProfileDto, @Req() req: RequestWithUser) {
    return this.petProfileService.create(createPetProfileDto, req.user);
  }

  @Get()
  findAll() {
    return this.petProfileService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.petProfileService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petProfileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetProfileDto: UpdatePetProfileDto, @Req() req: RequestWithUser) {
    return this.petProfileService.update(id, updatePetProfileDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petProfileService.remove(id);
  }
}
