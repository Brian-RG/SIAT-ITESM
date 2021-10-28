import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entity/users.entity';
import { Repository } from 'typeorm';
import { ResponseStatus } from '../utils/interfaces/response';
import * as db from '../utils/db/crud-entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>
  ) {}

  /**
   * Creates a new professor in the database assigned to the user.
   * @param createReq The request that holds the data of the professors.
   * @param uuid The uuid of the user.
   * @returns A response to send back to the user with the new professors data.
   */

  /**
   * Queries all the professors of the user and sends them back.
   * @param uuid The user ID.
   * @returns A response with the result of the lookup in the DB.
   */
  async findAll(uuid: string): Promise<ResponseStatus> {
    //return db.findAll(uuid, 'professors', this.userRepository, ['professors']);
    return db.findAll<UsersEntity>(this.userRepository);
  }

}
