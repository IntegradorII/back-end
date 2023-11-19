import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBenefitService } from './user-benefit.service';
import { CreateUserBenefitDto } from './dto/create-user-benefit.dto';
import { UpdateUserBenefitDto } from './dto/update-user-benefit.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';

@Auth(Role.ADMIN)
@Controller('user-benefit')
export class UserBenefitController {
  constructor(private readonly userBenefitService: UserBenefitService) {}

  @Post()
  create(@Body() createUserBenefitDto: CreateUserBenefitDto) {
    return this.userBenefitService.create(createUserBenefitDto);
  }

  @Get()
  findAll() {
    return this.userBenefitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBenefitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBenefitDto: UpdateUserBenefitDto) {
    return this.userBenefitService.update(+id, updateUserBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBenefitService.remove(+id);
  }
}
