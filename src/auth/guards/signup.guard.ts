import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Role } from '@/common/enum/role.enum';
import { validateToken, extractTokenFromHeader } from '@/common/util/jwt';

@Injectable()
export class SignupGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const data = request.body;

    if (data.role !== Role.ADMIN) {
      return true;
    }
    
    const token = extractTokenFromHeader(request);

    if (!token) {
      // throw new UnauthorizedException('Token not found');
      throw new UnauthorizedException();
    }

    return validateToken({token, request, jwtService: this.jwtService, role: Role.ADMIN});
  }
}
