import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { UserData } from './auth.controller';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signup(signupDto: SignupDto) {
    const { docType, docNumber, email, password } = signupDto;
    let user = await this.usersService.findOneByDocTypeAndDocNumber(docType, docNumber);
    if (user) {
      throw new ConflictException('User already exists');
    }
    user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new ConflictException('Email already exists');
    }

    signupDto.password = await bcrypt.hash(password, 10);

    return await this.usersService.create(signupDto);
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      email: user.email,
      role: user.role,
    };
  }

  async profile(user: UserData) {
    return await this.usersService.findOneByEmail(user.email);
  }

  async auth0(userData: UserData) {
    let user = await this.usersService.findOneByEmail(userData.email);
    if (!user) {
      user = await this.usersService.create({
        email: userData.email,
      });
    }
    return user;
  }

}
