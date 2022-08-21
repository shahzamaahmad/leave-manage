// import { PartialType } from '@nestjs/mapped-types';
// import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto {
  status: string;
  leaveDate: Date;
  comment: string;
}
