import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { UserJwt } from './dto/user-jwt.dto';
import { expiresInToMilliseconds, jwtExpiresIn } from '@/auth/constants/jwt-constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async signup(signupDto: SignupDto) {
    const { docType, docNumber, email, password } = signupDto;
    let user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new ConflictException('Email already exists');
    }
    user = await this.usersService.findOneByDocTypeAndDocNumber(docType, docNumber);
    if (user) {
      throw new ConflictException('User already exists');
    }
    
    signupDto.password = await bcrypt.hash(password, 10);

    return await this.usersService.create(signupDto);
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user || !user.password) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: UserJwt = { 
      email: user.email,
      role: user.role,
      expires_at: new Date().getTime() + expiresInToMilliseconds(),
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('APP_JWT_SECRET'),
      expiresIn: jwtExpiresIn,
    });

    return {
      access_token: accessToken,
      email: user.email,
      role: user.role,
    };
  }

}
