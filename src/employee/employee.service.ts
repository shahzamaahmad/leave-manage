import { Employee } from './entities/employee.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly repo: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const emp = new Employee();
      emp.name = createEmployeeDto.name;
      emp.username = createEmployeeDto.username;
      emp.empID = createEmployeeDto.empID;
      emp.password = createEmployeeDto.password;
      emp.role = createEmployeeDto.role;
      return this.repo.save(emp);
    } catch (e) {
      return e;
    }
  }

  getLeaveById(id: number) {
    return this.repo.find({ where: { empID: id } });
    // return this.repo.findOne(empID);
  }

  approveLeave(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    // try {
    const emp = new Employee();

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

        if (updateEmployeeDto.status === 'approve') {
          user.takenLeave = user.takenLeave + 1;
          user.availableLeave = user.availableLeave - 1;
          user.leaveDetails.leave = {
            status: updateEmployeeDto.status,
            leaveDate: new Date(),
            comment: updateEmployeeDto.comment,
            ...user.leaveDetails,
          };
        }
        if (updateEmployeeDto.status === 'reject') {
          user.rejectLeave = +user.rejectLeave + 1;
          user.leaveDetails.leave = {
            status: updateEmployeeDto.status,
            leaveDate: new Date(),
            comment: updateEmployeeDto.comment,
            ...user.leaveDetails,
          };
        }
        if (updateEmployeeDto.status === 'pending') {
          user.pendingLeave = 1;
          user.leaveDetails.leave = {
            status: updateEmployeeDto.status,
            leaveDate: new Date(),
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

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
