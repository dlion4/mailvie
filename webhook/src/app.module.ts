import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "../.env"
    })
  ],
  controllers: [AppController, AuthenticationController],
  providers: [AppService, NotificationsGateway, AuthenticationService],
})
export class AppModule {}
