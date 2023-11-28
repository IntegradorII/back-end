import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJwt } from './dto/user-jwt.dto';

export interface RequestWithUser extends Request {
  user: UserJwt;
}

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  // @Public()
  @Auth(Role.ADMIN)
  async signup(@Req() req: RequestWithUser, @Body() signupDto: SignupDto) {
    const res = await this.authService.signup(signupDto);
    res.password = undefined;
    return {
      message: 'User created',
      creator: {
        email: req.user.email,
        role: req.user.role,
      },
      user: res,
    };
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Get('test/admin')
  @Auth(Role.ADMIN)
  testAdmin(@Req() req: RequestWithUser) {
    return {
      ...req.user,
    };
  }

  @Get('test/user')
  @Auth(Role.USER)
  testUser(@Req() req: RequestWithUser) {
    return {
      ...req.user,
    };
  }
  
}
