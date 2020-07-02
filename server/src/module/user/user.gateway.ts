import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { UserService } from './user.service'
import { IONLINEUSER } from './user.interface'

@WebSocketGateway()
export class UserGateway {
    constructor(private readonly userService: UserService) { }

    @SubscribeMessage('ONLINE_USER')
    public async sendOnlineUser(io: Socket, data: IONLINEUSER): Promise<IONLINEUSER> {
        console.log(this);
        // await this.dispatchMessage('ONLINE_USER', io, 1, data)
        return data
    }
}