import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '@/common/enum/role.enum';
import { RolesGuard } from '../guards/roles.guard';
// import { AuthGuard } from '../guards/auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}