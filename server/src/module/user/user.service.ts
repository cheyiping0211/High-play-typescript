const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//es5 ↑ AMD→范式
import { HttpException, Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UsersFriendEntity } from './userfriend.entity';
import { saltRounds, secret } from '../../util/config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
    @InjectRepository(UsersFriendEntity)
    private readonly usersFriendModel: Repository<UsersFriendEntity>,
  ) {}

  @Client({
    options: { host: '0.0.0.0', port: 8080 },
    transport: Transport.TCP,
  })
  private client: ClientProxy;
  /**
   * 登陆
   *
   * @param User User 实体对象
   * @param Token
   */
  async userLogin(user: UserEntity): Promise<UserEntity> {
    const { username, password, avatar } = user;
    const isUser = await this.userModel.findOne({ where: { username } });

    if (!isUser) {
      // User does not exists
      throw new Error(
        `We do not have any user registered with ${username} email address. Please signup.`,
      );
    } else {
      const passwordMatch = await bcrypt.compare(password, isUser.password);
      if (!passwordMatch) {
        // Incorrect password
        throw new Error(
          `Sorry, the password you entered is incorrect. Please try again.`,
        );
      } else {
        isUser.online = '1';
        this.userModel.save(isUser);
        const userDetailsToken = {
          username: isUser.username,
        };
        this.userModel.save(isUser);
        return await new Promise((resolve, reject) => {
          resolve(jwt.sign(userDetailsToken, secret));
        });
      }
    }
  }
  /**
   * 创建
   *
   * @param User User 实体对象
   */
  async createUser(user: UserEntity): Promise<UserEntity> {
    // Users exists with same email check
    const { username, password, avatar } = user;
    const isCreate = await this.userModel.findOne({ where: { username } });

    if (!isCreate) {
      // User does not exists
      const passwordHashed = await bcrypt.hash(password, 10);
      return this.userModel.save(
        this.userModel.create({
          username,
          password: passwordHashed,
          avatar,
        }),
      );
    } else {
      // User exists
      throw new Error(
        `The username ${username} is already registered. Please try to login.`,
      );
    }
  }
  /**
   * 删除
   *
   * @param id ID
   */
  async deleteUser(id: number): Promise<void> {
    await this.findOneById(id);
    this.userModel.delete(id);
  }
  /**
   * 更新
   *
   * @param user User 实体对象
   */
  async updateUser(id: number, user: UserEntity): Promise<void> {
    const existUser = await this.findOneById(id);
    // 当传入空数据时，避免覆盖原数据
    existUser.username =
      user && user.username ? user.username : existUser.username;
    existUser.avatar = user && user.username ? user.username : existUser.avatar;
    this.userModel.save(existUser);
  }
  /**
   * 查询所有
   */
  async findUsers(): Promise<UserEntity[]> {
    return await this.userModel.find();
  }
  /**
   * 查询有多少用户
   */
  async findUserCount(): Promise<number> {
    return await this.userModel.count();
  }
  /**
   * 根据ID查询
   *
   * @param id ID
   */
  async findOneUser(id: number): Promise<UserEntity> {
    return this.findOneById(id);
  }
  /**
   * 根据ID查询单个信息，如果不存在则抛出404异常
   * @param id ID
   */
  private async findOneById(id: number): Promise<UserEntity> {
    const users = await this.userModel.findOne(id, {
      relations: ['userfriend'],
    });
    if (!users) {
      throw new HttpException(`指定 id=${id} 的用户不存在`, 404);
    }
    return users;
  }
}
