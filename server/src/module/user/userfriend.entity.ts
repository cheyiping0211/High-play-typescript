import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
@Entity('userfriend')
export class UsersFriendEntity {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number;
  /**
   * 名称
   */
  @Column({
    comment: '名称',
  })
  name: string;
  /**
   * 省
   */
  @Column({
    comment: '经度',
  })
  lat: string;
  /**
   * 市
   */
  @Column({
    comment: '纬度',
  })
  lng: string;
  /**
   * 关联用户id
   */
  @ManyToOne(
    type => UserEntity,
    friend => friend.id,
  )
  user: UserEntity;
}
