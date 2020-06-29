const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//es5 ↑ AMD→范式
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { saltRounds, secret } from "../../util/config"
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private readonly userModel: Repository<Users>,  // 使用泛型注入对应类型的存储库实例
    ) { }
    /**
    * 登陆
    *
    * @param User User 实体对象
    * @param Token 
    */
    async userLogin(user: Users): Promise<Users> {
        const { username, password, avatar } = user;
        const isCreate = await this.userModel.findOne({ where: { username } })

        if (!isCreate) {
            // User does not exists
            throw new Error(`We do not have any user registered with ${username} email address. Please signup.`)
        } else {
            // User exists
            const passwordMatch = await bcrypt.compare(password, user.password)
            // if (!passwordMatch) {
            //     // Incorrect password
            //     throw new Error(`Sorry, the password you entered is incorrect. Please try again.`)
            // } else {
            const userDetailsToken = {
                username: user.username,
            }
            return await new Promise((resolve, reject) => {
                resolve(
                    jwt.sign(userDetailsToken, secret)
                )
            })
            // }
        }
    }
    /**
     * 创建
     *
     * @param User User 实体对象
     */
    async createUser(user: Users): Promise<Users> {
        // Users exists with same email check
        const { username, password, avatar } = user;
        const isCreate = await this.userModel.findOne({ where: { username } })

        if (!isCreate) {
            // User does not exists

            const passwordHashed = await bcrypt.hash(password, saltRounds);
            return this.userModel.save(this.userModel.create(
                {
                    username,
                    password: passwordHashed,
                    avatar,
                }
            ));
        } else {
            // User exists
            throw new Error(`The username ${username} is already registered. Please try to login.`)
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
    async updateUser(id: number, user: Users): Promise<void> {
        const existUser = await this.findOneById(id);
        // 当传入空数据时，避免覆盖原数据
        existUser.username = user && user.username ? user.username : existUser.username;
        existUser.avatar = user && user.username ? user.username : existUser.avatar;
        this.userModel.save(existUser);
    }
    /**
     * 查询所有
     */
    async findUsers(): Promise<Users[]> {
        return await this.userModel.find();
    }
    /**
     * 根据ID查询
     *
     * @param id ID
     */
    async findOneUser(id: number): Promise<Users> {
        return this.findOneById(id);
    }
    /**
     * 根据ID查询单个信息，如果不存在则抛出404异常
     * @param id ID
     */
    private async findOneById(id: number): Promise<Users> {
        const userInfo = await this.userModel.findOne(id);
        if (!userInfo) {
            throw new HttpException(`指定 id=${id} 的用户不存在`, 404);
        }
        return userInfo;
    }
}