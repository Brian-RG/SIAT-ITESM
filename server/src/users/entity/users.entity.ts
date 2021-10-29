import securityUtils from '../../utils/security.utils';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { CourseEntity } from '../../courses20/entity/course20.entity';
import { ModuleEntity } from '../../module/entity/module.entity';
import { ProfessorsEntity } from '../../professors/entity/professors.entity';
import { ClassroomsEntity } from '../../classrooms/entity/classrooms.entity';
import { PeriodsEntity } from '../../periods/entity/periods.entity';
import { Course21Entity } from '../../courses21/entities/course21.entity';
import { AvenueEntity } from '../../avenue/entity/avenue.entity';

import {UserType} from '../usertype/user-type';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    unique: true,
    length: 10,
  })
  nomina: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: true,
  })
  type: UserType;

  @BeforeInsert() async hashPassword() {
    this.password = await securityUtils.hashPass(this.password);
  }
}
