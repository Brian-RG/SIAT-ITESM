import { ModuleEntity } from '../../module/entity/module.entity';
import { BaseCourseEntity } from '../../utils/db/base-course';
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

@Entity('courses21')
export class Course21Entity extends BaseCourseEntity {
  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.courses21)
  user: UsersEntity;

  @ManyToMany(() => ModuleEntity, { cascade: true })
  @JoinTable()
  modules: ModuleEntity[];

  @OneToMany(() => GroupsEntity, (GroupsEntity) => GroupsEntity.course21)
  groups: GroupsEntity[];
}
