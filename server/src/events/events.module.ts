import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { EventsEntity } from './entity/events.entity';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventsEntity,
      GroupsEntity,
      BloqueGroupModulesEntity,
    ]),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
