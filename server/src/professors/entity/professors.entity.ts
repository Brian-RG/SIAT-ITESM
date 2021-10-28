import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProfessorsToGroups } from '../../professorsToGroups/entity/professorsToGroups.entity';
import { ProfessorsToBloqueModules } from '../../professorsToBloqueModules/entity/professorsToBloqueModules.entity';

@Entity('professors')
export class ProfessorsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  nomina: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
    array: true,
  })
  area: string[];

  @Column({
    nullable: true,
  })
  coordination: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column('real', {
    nullable: false,
  })
  loadLimit: number;

  @OneToMany(
    () => ProfessorsToGroups,
    (ProfessorsToGroups) => ProfessorsToGroups.professor,
  )
  groups20: ProfessorsToGroups[];

  @OneToMany(
    () => ProfessorsToBloqueModules,
    (ProfessorsToBloqueModules) => ProfessorsToBloqueModules.professor,
  )
  groups21: ProfessorsToBloqueModules[];
}
