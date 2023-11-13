import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupGuard } from './guards/signup.guard';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enum/role.enum';

export interface UserData {
  email?: string;
  role?: string;
}

interface RequestWithUser extends Request {
  user: UserData;
}

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  @UseGuards(SignupGuard)
  async signup(@Req() req: RequestWithUser, @Body() signupDto: SignupDto) {
    const res = await this.authService.signup(signupDto);
    return {
      message: 'User created',
      user: req.user,
      data: res,
    }
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
}
