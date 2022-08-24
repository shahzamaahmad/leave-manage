/* eslint-disable prettier/prettier */
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { EmployeeModule } from './../employee/employee.module';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constant';

// @Module({
//   imports: [EmployeeModule],
//   providers: [AuthService],
// })
@Module({
  imports: [
    EmployeeModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
