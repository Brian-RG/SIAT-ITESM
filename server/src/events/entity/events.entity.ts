import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { GroupsEntity } from '../../groups/entity/groups.entity';
import { BloqueModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

@Entity('events')
export class EventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date', {
    nullable: false,
  })
  startTime: Date;

  @Column({
    nullable: false,
  })
  startTimeString: string;

  @Column('date', {
    nullable: false,
  })
  endTime: Date;

  @Column({
    nullable: false,
  })
  endTimeString: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  weekDays: string[];

  @ManyToOne(() => GroupsEntity, (GroupsEntity) => GroupsEntity.events)
  group: GroupsEntity;

  @ManyToOne(
    () => BloqueModulesEntity,
    (BloqueModulesEntity) => BloqueModulesEntity.events,
  )
  bloqueGroup: BloqueModulesEntity;
}
