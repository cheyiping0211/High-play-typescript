import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UsersFriendEntity } from './userfriend.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserGateway } from './user.gateway';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UsersFriendEntity])],
  providers: [UserResolver, UserGateway, UserService],
})
export class UserModule {}
