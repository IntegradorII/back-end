import { UnauthorizedException } from '@nestjs/common';
import { Role } from '../enum/role.enum';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface Params {
  token: string;
  request: Request;
  jwtService: JwtService;
  role?: Role;
}

export const  validateToken = async ({token, request, jwtService, role}: Params) : Promise<boolean> => {
  try {
    const payload = await jwtService.verifyAsync(token, {
      secret: process.env.APP_JWT_SECRET,
    });
    if(role !== undefined && payload.role !== role) {
      throw new Error('Invalid role');
    }
    request['user'] = payload;
  } catch (error) {
    // throw new UnauthorizedException('Invalid token');
    throw new UnauthorizedException();
  }
  return true;
};

export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};