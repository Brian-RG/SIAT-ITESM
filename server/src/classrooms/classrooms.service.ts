import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { Repository } from 'typeorm';
import { ClassroomDto } from './dto/classroom.dto';
import { ClassroomsEntity } from './entity/classrooms.entity';
import { ResponseStatus } from '../utils/interfaces/response';
import { CreateClassroomsReq } from './interfaces/create-classrooms-req.interface';
import * as db from '../utils/db/crud-entity';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(ClassroomsEntity)
    private classroomsRepository: Repository<ClassroomsEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Creates new classroom in the database assigned to the user.
   * @param createReq The request that holds the data of the classrooms.
   * @param uuid The uuid of the user
   * @returns A response to send back to the user with the new classrooms data.
   */
  async create(
    createReq: CreateClassroomsReq,
    uuid: string,
  ): Promise<ResponseStatus> {
    return db.createWithUserRelation<ClassroomsEntity, ClassroomDto>(
      this.userRepository,
      this.classroomsRepository,
      uuid,
      ['classrooms'],
      createReq.classrooms,
      'classrooms',
    );
  }

  /**
   * Queries all the classrooms of the user and sends them back.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    return db.findAll(uuid, 'classrooms', this.userRepository, ['classrooms']);
  }

  /**
   * Queries a single the classroom of the user and sends them back.
   * @param uuid The uuid of the classroom.
   * @returns A response with the result of the lookup in the DB.
   */
   async findOne(id: string): Promise<ResponseStatus> {
    return db.findOne(id, this.classroomsRepository, {where: {id: id}});
  }

  /**
   * Updates a classroom of the user.
   * @param userId The ID of the user.
   * @param classroomId The ID of the classroom to update.
   * @param updateClassroomDto The data to be replaced.
   * @returns A response with the new value as a result.
   */
  async update(
    userId: string,
    classroomId: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<ResponseStatus> {
    return db.update<ClassroomsEntity, UpdateClassroomDto>(
      userId,
      classroomId,
      updateClassroomDto,
      this.classroomsRepository,
      { where: { id: classroomId } },
    );
  }

  /**
   * Removes a single classroom from the DB.
   * @param userId The ID of the user who made the request.
   * @param classroomId The ID of the professor to be deleted.
   * @returns A response stating success or failure.
   */
  async remove(userId: string, classroomId: string): Promise<ResponseStatus> {
    return db.remove(userId, classroomId, this.classroomsRepository, {
      id: classroomId,
    });
  }
}
