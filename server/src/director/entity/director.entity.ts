import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { UsersEntity } from '../../users/entity/users.entity';
  import { ProfessorsToGroups } from '../../professorsToGroups/entity/professorsToGroups.entity';
  import { ProfessorsToBloqueModules } from '../../professorsToBloqueModules/entity/professorsToBloqueModules.entity';
  
  @Entity('professors')
  export class DirectorEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
  
    @Column({
      nullable: false,
    })
    name: string;
  }
  