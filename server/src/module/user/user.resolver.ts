import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Subscription, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Result } from '../../util/result.interface';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

const pubSub = new PubSub();

@Resolver('User')
export class UserResolver {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Mutation('userLogin')
  async userLogin(@Args('user') user: UserEntity): Promise<Result> {
    const token = await this.userService.userLogin(user);
    return { code: 200, message: '登陆成功', data: token };
  }
  @Mutation('createUser')
  async create(@Args('user') user: UserEntity) {
    const data = await this.userService.createUser(user);
    const userCount = await this.userService.findUserCount();
    pubSub.publish('watchUsers', {
      watchUsers: {
        data: { code: 200, message: '触发监听', count: userCount },
      },
    });
    return { code: 200, message: '创建成功', data };
  }
  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: number): Promise<Result> {
    await this.userService.deleteUser(id);
    const userCount = await this.userService.findUserCount();
    pubSub.publish('watchUsers', {
      watchUsers: {
        data: { code: 200, message: '触发监听', count: userCount },
      },
    });

    return { code: 200, message: '删除成功' };
  }
  @Mutation('updateUser')
  async updateUser(
    @Args() updateInput: { id: number; user: UserEntity },
  ): Promise<Result> {
    await this.userService.updateUser(updateInput.id, updateInput.user);
    return { code: 200, message: '更新成功' };
  }
  @Query('findOneUser')
  async findOneUser(@Args('id') id: number): Promise<Result> {
    const data = await this.userService.findOneUser(id);
    return { code: 200, message: '查询成功', data };
  }
  @Query('findUsers')
  async findUsers(): Promise<Result> {
    const data = await this.userService.findUsers();
    const userCount = await this.userService.findUserCount();
    pubSub.publish('watchUsers', {
      watchUsers: {
        data: { code: 200, message: '触发监听', count: userCount },
      },
    });
    return { code: 200, message: '查询成功', data };
  }
  @Subscription()
  watchUsers() {
    return pubSub.asyncIterator('watchUsers');
  }
}
