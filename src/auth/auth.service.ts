import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async signup(signupDto: SignupDto) {
    const { doc_type, doc_number, email, password } = signupDto;
    let user = await this.usersService.findOneByDocTypeAndDocNumber(doc_type, doc_number);
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
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.doc_type + user.doc_number };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      email: user.email,
    }
  }

}
