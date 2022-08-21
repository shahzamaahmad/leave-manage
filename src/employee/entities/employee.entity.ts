import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  ID: number;
  @Column()
  empID: number;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column({ default: 12 })
  availableLeave: number;
  @Column({ default: 0 })
  takenLeave: number;
  @Column({ default: 0 })
  rejectLeave: number;
  @Column({ default: 0 })
  pendingLeave: number;
  @Column('simple-json', {
    default: { leave: { status: 'NA', leaveDate: 'NA', comment: 'NA' } },
  })
  leaveDetails: {
    leave: {
      status: string;
      leaveDate: Date;
      comment: string;
    };
  };
}
