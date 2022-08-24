/* eslint-disable prettier/prettier */
import { LocalAuthGuard } from './local.authguard';
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
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApplyLeaveEmployeeDto } from './dto/applyleave-employee.dto';
@Controller('employee')
export class EmployeeController {
  constructor(
    // @Inject(forwardRef(() => AuthService))
    // private authService: AuthService,
    private readonly employeeService: EmployeeService, // private readonly authService: AuthService,
  ) { }

  @Post('signup')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req: any) {
    // console.log(req);
    return req.user;
    // return 'successfully login';
    // return this.employeeService.login({ username: req.user.username });
    // return this.authService.login(req.usename);
  }

  @Get('getLeave/:empID')
  getLeave(@Param('empID') empID: number) {
    return this.employeeService.getLeaveById(empID);
  }

  @Patch('responseLeave/:id')
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
