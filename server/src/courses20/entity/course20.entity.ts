import { BaseCourseEntity } from '../../utils/db/base-course';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { GroupsEntity } from '../../groups/entity/groups.entity';

@Entity('courses20')
export class CourseEntity extends BaseCourseEntity {
  @Column({
    nullable: false,
  })
  udc: number;
  @OneToMany(() => GroupsEntity, (GroupsEntity) => GroupsEntity.course)
  groups: GroupsEntity[];
}
