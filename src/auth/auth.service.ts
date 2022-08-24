/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from './../employee/employee.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.employeeService.findOne(username);
    // console.log(user);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
  async generateToken(user: any) {
    console.log(user);

    const payload = { username: user.username, empID: user.empID };
    return {
      access_token: this.jwtService.sign(payload),
      // const secret = 'secretkey'
      // const signOptions: { scret: 'secretkey' expiresIn: '60s' },
      // this.jwtService.sign(payload, signOptions);
    };
  }
}
