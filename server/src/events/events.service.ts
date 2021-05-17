import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqueGroupModulesEntity } from '../bloque-group-modules/entity/bloque-modules.entity';
import { ClassroomsEntity } from '../classrooms/entity/classrooms.entity';
import { GroupsEntity } from '../groups/entity/groups.entity';
import { Repository } from 'typeorm';
import { BaseEventDto } from './dto/base-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDto } from './dto/event-entity.dto';
import { DEFAULT_DATE, EventsEntity } from './entity/events.entity';
import { ProfessorsToGroups } from 'src/professorsToGroups/entity/professorsToGroups.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventsEntity)
    private eventRepository: Repository<EventsEntity>,
    @InjectRepository(GroupsEntity)
    private groupsRepository: Repository<GroupsEntity>,
    @InjectRepository(BloqueGroupModulesEntity)
    private bloqueGroupsRepository: Repository<BloqueGroupModulesEntity>,
    @InjectRepository(ProfessorsToGroups)
    private professorsToGroupsRepository: Repository<ProfessorsToGroups>,
  ) {}

  /**
   * Creates an event that corresponds to a Tec 20 group.
   * @param eventDto The data of the event.
   * @returns The data created.
   */
  async createEventTec20(eventDto: CreateEventDto): Promise<EventDto[]> {
    const group20 = await this.groupsRepository.findOne({
      where: { id: eventDto.groupId },
      relations: ['events'],
    });
    if (group20) {
      const events: EventsEntity[] = [];
      for (const event of eventDto.events) {
        const eventEntity = this.eventRepository.create(event);
        group20.events.push(eventEntity);
        events.push(eventEntity);
      }
      await this.eventRepository.save(events);
      await this.groupsRepository.save(group20);
      const response = [];
      for (const event of events) {
        response.push(this._eventEntityToDto(event));
      }
      return response;
    }
    return null;
  }

  /**
   * Creates an event that corresponds to a Tec 21 group.
   * @param eventDto The data of the event.
   * @returns The data created.
   */
  async createEventTec21(eventDto: CreateEventDto): Promise<EventDto[]> {
    const group21 = await this.bloqueGroupsRepository.findOne({
      where: { id: eventDto.bloqueGroupId },
      relations: ['events'],
    });
    if (group21) {
      const events: EventsEntity[] = [];
      for (const event of eventDto.events) {
        const eventEntity = this.eventRepository.create(event);
        group21.events.push(eventEntity);
        events.push(eventEntity);
      }
      await this.eventRepository.save(events);
      await this.bloqueGroupsRepository.save(group21);
      const response = [];
      for (const event of events) {
        response.push(this._eventEntityToDto(event));
      }
      return response;
    }
    return null;
  }

  /**
   * Finds the event of a TEC 20 group.
   * @param groupId The group which the events are assigned to.
   * @returns The events that correspond to the group.
   */
  async findEventTec20(groupId: string): Promise<EventDto[]> {
    const group20 = await this.groupsRepository.findOne({
      where: { id: groupId },
      relations: ['events'],
    });
    if (group20) {
      const events: EventDto[] = [];
      for (const event of group20.events) {
        events.push(this._eventEntityToDto(event));
      }
      return events;
    }
    return null;
  }

  /**
   * Finds the event of a TEC 21 group.
   * @param groupId The group which the events are assigned to.
   * @returns The events that correspond to the group.
   */
  async findEventTec21(groupId: string): Promise<EventDto[]> {
    const group21 = await this.bloqueGroupsRepository.findOne({
      where: { id: groupId },
    });
    const events: EventDto[] = [];
    for (const event of group21.events) {
      events.push(this._eventEntityToDto(event));
    }
    return events;
  }

  /**
   * Removes an event from the DB.
   * @param eventId The ID of the event.
   * @returns A boolean stating if the event was found.
   */
  async removeEvent(eventId: string): Promise<boolean> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (event) {
      await this.eventRepository.remove(event);
      return true;
    }
    return false;
  }

  /**
   * Transforms an entity to a DTO
   * @param event The event entity to be transformed.
   * @returns The DTO of the event.
   */
  _eventEntityToDto(event: EventsEntity): EventDto {
    const eventDto: EventDto = {
      id: event.id,
      startTime: event.startTimeString,
      endTime: event.endTimeString,
      weekDay: event.weekDay,
    };
    return eventDto;
  }

  async searchClassroomCollision(
    classroom: ClassroomsEntity,
    eventDtos: BaseEventDto[],
  ): Promise<boolean> {
    const groups = await this.groupsRepository.find({
      where: { classroom: classroom },
      relations: ['events'],
    });
    if (groups.length > 0) {
      // There must be another way to do this faster using the query builder,
      // but because of time will leave it on a nice to have.
      for (const group of groups) {
        for (const event of group.events) {
          for (const dtoEvent of eventDtos) {
            if (this._checkTimeCollision(dtoEvent, event)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  async searchProfessorsCollision(
    professors: string[],
    eventDtos: BaseEventDto[],
  ): Promise<boolean> {
    const entities = await this.professorsToGroupsRepository
      .createQueryBuilder('rel')
      .innerJoinAndSelect('rel.group', 'group')
      .innerJoinAndSelect('group.events', 'events')
      .where('rel.professor IN(:...ids)', { ids: professors })
      .getMany();
    if (entities.length > 0) {
      for (const entity of entities) {
        for (const event of entity.group.events) {
          for (const dtoEvent of eventDtos) {
            if (this._checkTimeCollision(dtoEvent, event)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  _checkTimeCollision(dtoEvent: BaseEventDto, event: EventsEntity) {
    const st = this._stringToDate(dtoEvent.startTime);
    const et = this._stringToDate(dtoEvent.endTime);
    const eventSt = this._stringToDate(event.startTime.toString());
    const eventEt = this._stringToDate(event.endTime.toString());
    // Check if the hours collide.
    return (
      ((st >= eventSt && st < eventEt) || (et > eventSt && et <= eventEt)) &&
      dtoEvent.weekDay == event.weekDay
    );
  }

  _stringToDate(date: string): Date {
    return new Date(`${DEFAULT_DATE} ${date}`);
  }
}