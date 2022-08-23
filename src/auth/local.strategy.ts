import { EmployeeService } from './../employee/employee.service';
/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,
     private jwtService: JwtService,
     private readonly employeeService:EmployeeService
     ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.employeeService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if(user && user.password=== password){
      const {password,...result}=user
      return result
    }
    return null
  }
  // async validate(username: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(username, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user
  // }
    async login(user: any) {
    const payload = { username: user.username, sub: user.empID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
