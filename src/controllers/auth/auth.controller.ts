import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/services/auth/auth.service';
import { SignupDto, SigninDto } from './dto/auth.dto';

@ApiTags('Authorize')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    console.log({ dto });
    return this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: SigninDto) {
    console.log({ dto });
    return this.authService.signin(dto);
  }
}
