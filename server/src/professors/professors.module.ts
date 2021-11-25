import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { ProfessorsEntity } from './entity/professors.entity';
import { UsersEntity } from '../users/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { EventsModule } from '../events/events.module';
import { MailModule } from '../mail/mail.module';


@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([ProfessorsEntity, UsersEntity]),
    MailModule
  ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService, JwtStrategy],
  exports: [ProfessorsService],
})
export class ProfessorsModule {}
