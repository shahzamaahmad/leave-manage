import { Employee } from './../employee/entities/employee.entity';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from './../employee/employee.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.employeeService.findOne(username);
  //   console.log(user);

  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;

  //     return result;
  //   }
  //   return null;
  // }
  async login(user: any) {
    const payload = { username: user.username, empID: user.empID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
