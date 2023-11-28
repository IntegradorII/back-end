import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length === 0) {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    // return requiredRoles.some((role) => user.role?.includes(role));
    return requiredRoles.some((role) => user.role === role);
  }
}
