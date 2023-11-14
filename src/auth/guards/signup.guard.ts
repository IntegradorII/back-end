import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants/jwt.constants';
import { Request } from 'express';
import { Role } from '@/common/enum/role.enum';

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
    
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      // throw new UnauthorizedException('Token not found');
      throw new UnauthorizedException();
    }

    return this.validateToken(token, request);
  }

  private async validateToken(token: string, request: Request) : Promise<boolean> {
    try {

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      if (payload.role !== Role.ADMIN) {
        throw new Error('Invalid role');
      }

      request['user'] = payload;

    } catch (error) {
      // throw new UnauthorizedException('Invalid token');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
