import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class AuthenticationService {
    private readonly users:  User[] = []
    constructor(private notificationGateway: NotificationsGateway){}

    login(data: any): User[]{
        // send this data both to login and dashboard pages
        this.notificationGateway.sendUpdate(data)
        return this.users
    }
}
