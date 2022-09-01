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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  // @UseGuards(JwtAuthGuard)
  login(@Request() req: any) {

    return this.authService.generateToken(req.user);
    // return req.user;
  }

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
