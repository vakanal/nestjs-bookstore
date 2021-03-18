import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, LoggedInDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  signup(@Body() signupDto: SignUpDto): Promise<void> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true }))
  signin(@Body() signinDto: SignInDto): Promise<LoggedInDto> {
    return this.authService.signin(signinDto);
  }
}
