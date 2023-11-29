import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '@/auth/auth.controller';

@ApiTags('users')
@ApiBearerAuth()
@Auth(Role.ADMIN, Role.USER)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findOne(@Req() req: RequestWithUser) {
    return this.usersService.findOneByEmail(req.user.email);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':docType/:docNumber')
  findOneByDocTypeAndDocNumber(@Param('docType') docType: string, @Param('docNumber') docNumber: string) {
    return this.usersService.findOneByDocTypeAndDocNumber(docType, docNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
