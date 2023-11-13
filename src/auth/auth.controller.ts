import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from './guards/guards.guard';
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  @UseGuards(AuthGuard)
  signup(@Request() req, @Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  // @Post('signup')
  // signup(@Body() signupDto: SignupDto) {
  //   return this.authService.signup(signupDto);
  // }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
