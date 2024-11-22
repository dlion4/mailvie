/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/interfaces/user.interface';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Injectable()
export class AuthenticationService {
  private readonly users: User[] = [];
  constructor(
    private notificationGateway: NotificationsGateway,
    private configService: ConfigService,
  ) { }

  login(data: any): User[] {
    // send this data both to login and dashboard pages
    this.notificationGateway.sendUpdate(data);
    const url = this.configService.get<string>('ZEROBOUNCE_DASHBOARD_AUTHORIZE_URL');
    const authorizeDashboard = async ({ email, }: { email: string; }): Promise<any> => {
      const response = await fetch(`${url}/api/users/me/`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Some error occured');
      }
      // return await response.json();
      console.log(response.statusText)
      console.log(response.status)
    };
    const email = data?.email;

    authorizeDashboard({ email });
    return this.users;
  }
}
