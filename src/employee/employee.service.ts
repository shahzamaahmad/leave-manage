import { AuthService } from './../auth/auth.service';
import { Employee } from './entities/employee.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Repository } from 'typeorm';
import { ApplyLeaveEmployeeDto } from './dto/applyleave-employee.dto';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly repo: Repository<Employee>, // private readonly authService: AuthService,
  ) { }

  create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const emp = new Employee();
      emp.name = createEmployeeDto.name;
      emp.username = createEmployeeDto.username;
      emp.empID = createEmployeeDto.empID;
      emp.password = createEmployeeDto.password;
      emp.role = createEmployeeDto.role;

      // const userObj = async () => {
      //   const user = await this.repo.findOneBy({ ID: createEmployeeDto.empID });
      //   return user;
      // };
      // userObj().then((id: Employee) => {
      //   if (id.empID === createEmployeeDto.empID) return 'ID Alredy exist';
      // });

      return this.repo.save(emp);
    } catch (e) {
      return 'Employee Id Already Exist';
    }
  }

  getLeaveById(id: number) {
    return this.repo.find({ where: { empID: id } });
    // return this.repo.findOne(empID);
  }

  responseLeave(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    // try {
    // const emp = new Employee();

    const userObj = async () => {
      const user = await this.repo.findOneBy({ ID: id });
      return user;
    };
    return userObj()
      .then((user: Employee) => {
        // user.leaveDetails.leave = {
        //   status: updateEmployeeDto.status,
        //   leaveDate: new Date(),
        //   comment: updateEmployeeDto.comment,
        //   ...user.leaveDetails,
        // };

        if (
          updateEmployeeDto.status === 'approve' &&
          user.availableLeave !== 0
        ) {
          // user.pendingLeave >= 0
          //   ? user.pendingLeave - 1
          //   : (user.pendingLeave = 0);
          user.pendingLeave = user.pendingLeave - updateEmployeeDto.leaveDays;
          user.takenLeave = user.takenLeave + 1;
          user.availableLeave =
            user.availableLeave - updateEmployeeDto.leaveDays;
          user.leaveDetails.leave = {
            status: updateEmployeeDto.status,
            leaveDate: new Date(),
            leaveDays: +updateEmployeeDto.leaveDays,
            comment: updateEmployeeDto.comment,

            ...user.leaveDetails,
          };
        }
        if (updateEmployeeDto.status === 'reject') {
          user.rejectLeave = +user.rejectLeave + 1;
          user.leaveDetails.leave = {
            status: updateEmployeeDto.status,
            leaveDate: new Date(),
            leaveDays: updateEmployeeDto.leaveDays,
            comment: updateEmployeeDto.comment,
            ...user.leaveDetails,
          };
        }
        if (updateEmployeeDto.status === 'pending') {
          user.pendingLeave = user.pendingLeave + 1;
          user.leaveDetails.leave = {
            status: updateEmployeeDto.status,
            leaveDate: new Date(),
            leaveDays: updateEmployeeDto.leaveDays,
            comment: updateEmployeeDto.comment,
            ...user.leaveDetails,
          };
        }

        return this.repo.save(user);
      })
      .catch((e) => {
        throw new Error('Please Enter A new Status' + e);
      });
  }

  applyLeave(id: number, applyLeaveEmployeeDto: ApplyLeaveEmployeeDto) {
    const userObj = async () => {
      const user = await this.repo.findOneBy({ ID: id });
      console.log(user);
      return user;
    };
    return userObj()
      .then((user: Employee) => {
        if (applyLeaveEmployeeDto.leaveDays <= 12) {
          user.pendingLeave = applyLeaveEmployeeDto.leaveDays;
        }
        return this.repo.save(user);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findOne(username: string) {
    const userObj = async () => {
      const user = await this.repo.findOneBy({ username: username });
      // await user.username;
      return user;
    };
    // console.log(userObj());
    return userObj();
  }
  async login({ username }: { username: string }) {
    const user = await this.repo.findOneBy({ username: username });
    // if (!user) {
    //   throw new UnauthorizedException('Invalid Credentials');
    // }
    const { password, ...result } = user;

    return result;
  }
}
