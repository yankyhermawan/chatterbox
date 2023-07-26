import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthEntity } from './entities/auth.entity';
import { UserEntity } from '../users/entities/user.entity';

import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ type: UserEntity })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('/login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }
}