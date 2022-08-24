import { JwtAuthGuard } from './jwt.authguard';
/* eslint-disable prettier/prettier */
import { AuthGuard } from '@nestjs/passport';
/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
// import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller('auth')
export class AppController {
  constructor(private authService: AuthService) { }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
