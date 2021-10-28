import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BloqueGroupModulesEntity } from '../../bloque-group-modules/entity/bloque-modules.entity';

@Entity('modules')
export class ModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(
    () => BloqueGroupModulesEntity,
    (BloqueModulesEntity) => BloqueModulesEntity.module,
  )
  bloqueModules: BloqueGroupModulesEntity[];
}
