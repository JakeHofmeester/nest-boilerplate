import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '~/services/auth/Decorator';
import { JwtGuard } from '~/services/auth/Guard';

@ApiTags('Users')
@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  @Get('me')
  getMe(@GetUser('id') userId: number) {
    return { userId: userId };
  }
}
