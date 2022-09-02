import { AuthGuard } from '@nestjs/passport';
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.authguard';
import { forwardRef } from '@nestjs/common/utils';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApplyLeaveEmployeeDto } from './dto/applyleave-employee.dto';
import { JwtAuthGuard } from './jwt.authguard';
import { Inject } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    req.user.access_token = await (await this.authService.generateToken(req.user)).access_token
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getLeave/:empID')
  getLeave(@Param('empID') empID: number) {
    return this.employeeService.getLeaveById(empID);
  }

  @Patch('responseLeave/:id')
  @UseGuards(LocalAuthGuard)
  resposeLeave(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.responseLeave(+id, updateEmployeeDto);
  }
  @Patch('applyLeave/:id/')
  applyLeave(
    @Param('id') id: number,
    @Body() applyLeaveEmployeeDto: ApplyLeaveEmployeeDto,
  ) {
    return this.employeeService.applyLeave(+id, applyLeaveEmployeeDto);
  }
}
