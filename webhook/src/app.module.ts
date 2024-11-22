/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { AuthenticationService } from './authentication/authentication.service';
import * as path from 'path';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: path.resolve(__dirname, '../.env'),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
       envFilePath: path.resolve(__dirname, '../.env'),
    })
  ],
  controllers: [AppController, AuthenticationController],
  providers: [AppService, NotificationsGateway, AuthenticationService],
})
export class AppModule {}
