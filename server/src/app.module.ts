import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/entity/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses20/courses.module';
import { ModuleModule } from './module/module.module';
import { ProfessorsModule } from './professors/professors.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { PeriodsModule } from './periods/periods.module';
import { Courses21Module } from './courses21/courses21.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [UsersEntity],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    ModuleModule,
    ProfessorsModule,
    ClassroomsModule,
    PeriodsModule,
    Courses21Module,
  ],
})
export class AppModule {}
