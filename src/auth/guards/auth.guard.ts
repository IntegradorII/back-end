//Custon Guard for JWT Authentication

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader, validateToken } from '@/common/util/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest<Request>();
    
    const token = extractTokenFromHeader(request);

    if (!token) {
      // throw new UnauthorizedException('Token not found');
      throw new UnauthorizedException();
    }

    return validateToken({token, request, jwtService: this.jwtService});
  }
}
