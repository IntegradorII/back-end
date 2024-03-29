import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupGuard } from './guards/signup.guard';
import { Auth } from './decorators/auth.decorator';
import { Role } from '@/common/enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth0Guard } from './guards/aut0.guard';

export interface UserData {
  email?: string;
  role?: string;
}

export interface RequestWithUser extends Request {
  user: UserData;
}

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  @UseGuards(SignupGuard)
  async signup(@Req() req: RequestWithUser, @Body() signupDto: SignupDto) {
    const res = await this.authService.signup(signupDto);
    res.password = undefined;
    return {
      message: 'User created',
      user: req.user,
      data: res,
    };
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
  
  @Get('profile')
  @Auth(Role.ADMIN)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }

  @UseGuards(Auth0Guard)
  @Post('auth0')
  auth0(@Req() req: RequestWithUser) {
    return this.authService.auth0(req.user);
  }
}
