import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class Users {
    /**
     * 自增主键
     */
    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

    /**
     * 用户名
     */
    @Column({
        comment: '用户名'
    })
    username: string;
    /**
     * 密码
     */
    @Column({
        comment: '密码'
    })
    password: string;
    /**
     * 头像
     */
    @Column({
        comment: '头像'
    })
    avatar: string;
}