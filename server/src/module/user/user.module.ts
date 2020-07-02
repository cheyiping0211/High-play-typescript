import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserGateway } from './user.gateway'
@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UserResolver, UserGateway, UserService],
})
export class UserModule { }