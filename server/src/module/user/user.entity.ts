import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UsersFriendEntity } from './userfriend.entity';
@Entity('user')
export class UserEntity {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number;

  /**
   * 用户名
   */
  @Column({
    comment: '用户名',
  })
  username: string;
  /**
   * 密码
   */
  @Column({
    comment: '密码',
  })
  password: string;
  /**
   * 头像
   */
  @Column({
    comment: '头像',
  })
  avatar: string;
  /**
   * 登陆状态
   */
  @Column({
    comment: '登陆状态',
  })
  online: string;

  @OneToMany(
    type => UsersFriendEntity,
    friend => friend.user,
  )
  userfriend: UsersFriendEntity[];
}
